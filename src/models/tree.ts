import { Collection } from "@/types/postman/collection";
import { Node } from './node'

export class Tree {
  public children: Node[]

  constructor({ item }: Collection) {
    this.children = item.map(i => new Node(this, i))
  }
}

