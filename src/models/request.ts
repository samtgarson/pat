import { Request as RawRequest, Response as RawResponse, Method } from '../../types/postman/collection'
import { keyValueToHash } from '../utils/key-value-converter'
import { AxiosRequestConfig } from 'axios'
import { PlainObj } from '@/types/postman/misc'

export class Request {
  private _query: PlainObj
  variables: PlainObj
  request: RawRequest
  responses: RawResponse[]
  environment: PlainObj = {}

  static formatQuery (query: PlainObj) {
    return Object.entries(query)
      .filter(kv => !!kv[0])
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

  withEnv (env?: PlainObj) {
    if (env) this.environment = env
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

  formatPath (vars: { [key: string]: string }) {
    const replacer = (match: string, k: string) => vars[k] || match
    const regex = new RegExp(':([^/]+)', 'g')
    return this.path.replace(regex, replacer)
  }

  axiosRequest (query: PlainObj = {}, params: PlainObj = {}, body = ''): AxiosRequestConfig {
    return {
      params: { ...this.query, ...query },
      baseURL: this.host,
      url: this.formatPath(params),
      method: this.method,
      data: body
    }
  }

  private templateEnv (str: string) {
    const replacer = (match: string, k: string) => this.environment[k.trim()] || match
    const regex = new RegExp('{{([^/]+)}}', 'g')
    return str.replace(regex, replacer)
  }
}

