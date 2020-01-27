import { Collection, Item, Request as RawRequest, Response as RawResponse } from "@/types/postman/collection"
import { Request } from '@/src/models/request'

export type SearchCandidate = {
  node: Node
  name: string
  description?: string
  ancestors: string[]
  searchText: string
}

const isCollection = (a: any): a is Collection => !!a.uid

export class Tree {
  public children: Node[]
  public id: string

  constructor (data: Collection | Item) {
    const { item } = data
    if (item) this.children = item.map(i => new Node(this, i))
    else this.children = []

    this.id = isCollection(data) ? data.uid : data._postman_id
  }

  searchCandidates () {
    const list: SearchCandidate[] = []
    this.children.forEach(n => n.searchCandidates([], list))

    return list
  }
}

export class Node extends Tree {
  private _request?: RawRequest
  private _responses?: RawResponse[]
  public name: string

  static isNode (n: any): n is Node {
    return !!n.name
  }

  constructor (public parent: Node | Tree, data: Item) {
    super(data)

    const { request, response, name } = data
    this._request = request
    this._responses = response
    this.name = name

  }

  get request () {
    if (this._request && this._responses) return new Request(this._request, this._responses)
  }

  searchCandidates (ancestors: string[] = [], list: SearchCandidate[] = []) {
    if (this.request) {
      list.push(this.forSearch(ancestors))
    }

    this.children.forEach(n => n.searchCandidates([...ancestors, this.name], list))

    return list
  }

  forSearch (ancestors: string[] = this.ancestors): SearchCandidate {
    return {
      ancestors,
      searchText: ancestors.join(' '),
      node: this,
      name: this.name,
      description: this.request?.description
    }
  }

  get ancestors () {
    let current = this.parent
    const ancestors: string[] = []

    while (current && Node.isNode(current)) {
      ancestors.unshift(current.name)
      current = current.parent
    }
    return ancestors
  }

}
