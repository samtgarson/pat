import { Node, Tree, SearchCandidate } from '@/src/models/node'
import { Collection, Item } from '@/types/postman/collection'
import fixture from '../fixtures/collection.json'

const createItem = (): Item => ({
  name: 'name',
  _postman_id: 'uid'
})

const collection = {
  ...fixture.collection,
  uid: 'uid'
}

describe('Tree', () => {
  const json: Collection = {
    ...collection,
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

  describe('searchCandidates', () => {
    let candidates: SearchCandidate[]
    beforeEach(() => {
      tree = new Tree(collection)
      candidates = tree.searchCandidates()
    })

    it('generates a list of search candidates', () => {
      expect(candidates).toHaveLength(65)
    })

    it('has the correct properties', () => {
      const candidate = candidates.find(c => c.name === 'Return all notifications')

      expect(candidate?.ancestors).toEqual(['Communications', 'notifications'])
    })
  })
})
