import { Node } from '@/src/models/node'
import { Tree } from '@/src/models/tree'
import { Collection, Item } from '@/types/postman/collection'
import fixture from '../fixtures/collection.json'

const createItem = (): Item => ({
  name: 'name',
  _postman_id: 'uid'
})

describe('Tree', () => {
  const json: Collection = {
    ...fixture.collection,
    uid: 'uid',
    item: [
      createItem(),
      createItem()
    ]
  }
  let tree: Tree

  beforeEach(() => {
    tree = new Tree(json)
  })

  it('creates some nodes', () => {
    expect(tree.children).toHaveLength(2)
    tree.children.forEach(c =>
      expect(c).toBeInstanceOf(Node)
    )
  })

  it('sets the correct parent', () => {
    tree.children.forEach(c =>
      expect(c).toHaveProperty('parent', tree)
    )
  })
})
