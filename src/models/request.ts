import { Request as RawRequest, Response as RawResponse } from '@/types/postman/collection'
import { keyValueToHash } from '@/src/utils/key-value-converter'
import { AxiosRequestConfig } from 'axios'

type PlainObj = { [key: string]: string }

export class Request {
  static formatQuery (query: PlainObj) {
    return Object.entries(query)
      .filter(([_k, v]) => !!v)
      .map(pair => pair.join('='))
      .join('&')
  }

  query: PlainObj
  variables: PlainObj
  request: RawRequest
  responses: RawResponse[]

  constructor (
    request: RawRequest,
    responses: RawResponse[]
  ) {
    this.request = request
    this.responses = responses
    this.query = keyValueToHash(request.url.query || [])
    this.variables = keyValueToHash(request.url.variable || [])
  }

  get method () {
    return this.request.method
  }

  get description () {
    return this.request.description
  }

  get host () {
    return this.request.url.host
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

  formatPath (vars: { [key: string]: string }) {
    const replacer = (_match: string, k: string) => vars[k]
    const regex = /:([^/]+)/g
    return this.path.replace(regex, replacer)
  }

  axiosRequest (query: PlainObj = {}, params: PlainObj = {}): AxiosRequestConfig {
    return {
      params: query,
      baseURL: [this.host],
      url: this.formatPath(params),
      method: this.method
    }
  }
}

