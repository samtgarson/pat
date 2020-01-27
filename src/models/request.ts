import { Request as RawRequest, Response as RawResponse, Method } from '@/types/postman/collection'
import { keyValueToHash } from '@/src/utils/key-value-converter'
import { AxiosRequestConfig } from 'axios'

type PlainObj = { [key: string]: string }

export class Request {
  private _query: PlainObj
  variables: PlainObj
  request: RawRequest
  responses: RawResponse[]

  environment: PlainObj = {}

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
    return this.templateEnv(this.request.url.host.join(''))
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

  get query () {
    return Object.entries(this._query)
      .reduce(
        (hsh, [k, v]) => ({
          ...hsh,
          [k]: this.templateEnv(v)
        }),
        {}
      )
  }

  private templateEnv (str: string) {
    const replacer = (match: string, k: string) => this.environment[k.trim()] || match
    const regex = new RegExp('{{([^/]+)}}', 'g')
    return str.replace(regex, replacer)
  }

  formatQuery (query: PlainObj) {
    const joinedQuery = Object.entries({ ...this.query, ...query })
      .filter(kv => !!kv[0])
      .map(pair => pair.join('='))
      .join('&')

    return this.templateEnv(joinedQuery)
  }

  formatPath (vars: { [key: string]: string }) {
    const replacer = (match: string, k: string) => vars[k] || match
    const regex = new RegExp(':([^/]+)', 'g')
    return this.path.replace(regex, replacer)
  }

  axiosRequest (query: PlainObj = {}, params: PlainObj = {}): AxiosRequestConfig {
    return {
      params: { ...this.query, ...query },
      baseURL: this.host,
      url: this.formatPath(params),
      method: this.method
    }
  }
}

