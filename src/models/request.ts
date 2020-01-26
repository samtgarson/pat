import { Request as RawRequest, Response as RawResponse } from '@/types/postman/collection'
import { Node } from './node'

export class Request {
  query: { [key: string]: string }
  parent: Node
  request: RawRequest
  responses: RawResponse[]

  constructor (
    parent: Node,
    request: RawRequest,
    responses: RawResponse[]
  ) {
    this.parent = parent
    this.request = request
    this.responses = responses
    this.query = request.url.query?.reduce((hsh, q) => ({ ...hsh, [q.key]: q.value }), {}) || {}
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

  setQuery (key: string, value: string) {
    this.query[key] = value
  }

  get formattedQuery () {
    return Object.entries(this.query)
      .map(pair => pair.join('='))
      .join('&')
  }

  get path () {
    return '/' + this.request.url.path.join('/')
  }
}

