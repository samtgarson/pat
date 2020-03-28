/* eslint-disable @typescript-eslint/camelcase */
import { Request as RawRequest, Response as RawResponse, Method } from '../../types/postman/collection'
import { keyValueToHash } from '../utils/key-value-converter'
import { AxiosRequestConfig } from 'axios'
import { PlainObj } from '@/types/postman/misc'
import { AuthTransportTypes, TIMEOUT } from '../constants'
import { passwordGrant } from '@/src/services/password-grant'
import { AuthenticationConfig } from '@/types/config'
import { isOAuth2, isBasicAuth } from '@/src/utils/auth-utils'

export class Request {
  private _query: PlainObj
  variables: PlainObj
  request: RawRequest
  responses: RawResponse[]
  environment: PlainObj = {}
  authentication?: AuthenticationConfig

  static formatQuery (query: PlainObj) {
    return Object.entries(query)
      .filter(kv => !!kv[0] && kv[1])
      .map(pair => pair.join('='))
      .join('&')
  }

  constructor (
    request: RawRequest,
    responses: RawResponse[]
  ) {
    this.request = request
    this.responses = responses
    this._query = keyValueToHash(request.url.query || [])
    this.variables = keyValueToHash(request.url.variable || [])
  }

  withConfig (env?: PlainObj, authentication?: AuthenticationConfig) {
    if (env) this.environment = env
    if (authentication) this.authentication = authentication
    return this
  }

  get method () {
    return this.request.method
  }

  get hasBody () {
    return [Method.Put, Method.Patch, Method.Post].includes(this.method)
  }

  get description () {
    return this.request.description
  }

  get host () {
    const host = this.templateEnv(this.request.url.host.join('.'))
    const { protocol } = this.request.url
    return protocol
      ? `${protocol}://${host}`
      : host
  }

  get hasVariables () {
    return Object.keys(this.variables).length > 0
  }

  get hasQuery () {
    return Object.keys(this.query).length > 0
  }

  get path () {
    return '/' + this.request.url.path.join('/')
  }

  get body () {
    return this.request.body?.raw
  }

  get bodyMode () {
    return this.request.body?.mode
  }

  get query (): PlainObj {
    return Object.entries(this._query)
      .reduce(
        (hsh, [k, v]) => ({ ...hsh, [k]: this.templateEnv(v) }),
        {}
      )
  }

  formatQuery (query: PlainObj) {
    const joinedQuery = Request.formatQuery({ ...this.query, ...query })

    return this.templateEnv(joinedQuery)
  }

  formatPath (vars: PlainObj) {
    const replacer = (match: string, k: string) => vars[k] || match
    const regex = new RegExp(':([^/]+)', 'g')
    return this.path.replace(regex, replacer)
  }

  axiosRequest (query: PlainObj = {}, params: PlainObj = {}, body = ''): Promise<AxiosRequestConfig> {
    const conf = {
      params: { ...this.query, ...query },
      baseURL: this.host,
      url: this.formatPath(params),
      method: this.method,
      data: body,
      timeout: TIMEOUT
    }
    return this.injectAuth(conf)
  }

  private templateEnv (str: string) {
    const replacer = (match: string, k: string) => this.environment[k.trim()] || match
    const regex = new RegExp('{{([^/]+)}}', 'g')
    return str.replace(regex, replacer)
  }

  private async injectAuth (config: AxiosRequestConfig) {
    if (!this.authentication) return config

    let value = await this.getAuthValue()

    switch (this.authentication.transport) {
      case AuthTransportTypes.Query:
        config.params.access_token = value
        break

      case AuthTransportTypes.Header:
        if (isOAuth2(this.authentication)) value = `Bearer ${value}`
        config.headers = { ...config.headers, Authorization: value }
        break
    }

    return config
  }

  private async getAuthValue () {
    const auth = this.authentication
    if (!auth) return ''
    if (isOAuth2(auth)) return await passwordGrant(auth.config)
    if (isBasicAuth(auth)) return ''
  }
}

