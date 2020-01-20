import { Request as RawRequest, Response as RawResponse } from '@/types/postman/collection'
import { Node } from './node'

export class Request {
  constructor (
    public parent: Node,
    public request: RawRequest,
    public responses: RawResponse[]
  ) {}

  get description () {
    return this.request.description
  }
}

