import { Request as RawRequest, Response as RawResponse } from '@/types/postman/collection'
import { keyValueToHash, hshToKeyValue } from '@/src/utils/key-value-converter'
import { KeyValue } from '@/types/postman/misc'

export class Request {
  static formatQuery (query: { [key: string]: string }) {
    return Object.entries(query)
      .filter(([_, v]) => !!v)
      .map(pair => pair.join('='))
      .join('&')
  }

  query: { [key: string]: string }
  request: RawRequest
  responses: RawResponse[]

  constructor (
    request: RawRequest,
    responses: RawResponse[]
  ) {
    this.request = request
    this.responses = responses
    this.query = keyValueToHash(request.url.query || [])
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

  get hasQuery () {
    return Object.keys(this.query).length > 0
  }

  get path () {
    return '/' + this.request.url.path.join('/')
  }
}

