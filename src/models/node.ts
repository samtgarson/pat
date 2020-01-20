import { Collection, Item } from "@/types/postman/collection"
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
  public request?: Request
  public name: string

  constructor (public parent: Node | Tree, data: Item) {
    super(data)

    const { request, response, name } = data

    this.name = name
    if (request && response) this.request = new Request(this, request, response)
  }

  isTopLevel () {
    return this.parent instanceof Tree
  }

  searchCandidates (ancestors: string[] = [], list: SearchCandidate[] = []) {
    if (this.request) {
      list.push(this.forSearch(ancestors))
    }

    this.children.forEach(n => n.searchCandidates([...ancestors, this.name], list))

    return list
  }

  forSearch (ancestors: string[]): SearchCandidate {
    return {
      ancestors,
      searchText: ancestors.join(' '),
      node: this,
      name: this.name,
      description: this.request?.description
    }
  }
}
