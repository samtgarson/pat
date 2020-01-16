import { Item } from "@/types/postman/collection";
import { Request } from '@/src/models/request'
import { Tree } from './tree'

export class Node {
  public children?: Node[]
  public request?: Request

  constructor(public parent: Node | Tree, { item, request, response }: Item) {
    if (item) this.children = item.map(i => new Node(this, i))
    if (request && response) this.request = new Request(this, request, response)
  }

  isTopLevel () {
    return this.parent instanceof Tree
  }
}
