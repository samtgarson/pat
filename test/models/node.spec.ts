import { Node } from '@/src/models/node'
import { Request } from '@/src/models/request'
import { Item } from '@/types/postman/collection'
import fixture from '../fixtures/item.json'

const createItem = (): Item => ({
  name: 'Root',
  // eslint-disable-next-line @typescript-eslint/camelcase
  _postman_id: 'uid'
})


describe('Node', () => {
  const parent = new Node({} as Node, createItem())
  const node = new Node(parent, fixture)
  const [child] = node.children

  it('sets the parent', () => {
    expect(node.parent).toEqual(parent)
    expect(child.parent).toEqual(node)
  })

  it('creates child items', () => {
    expect(node.children).toHaveLength(fixture.item.length)
    node.children.forEach(c =>
      expect(c).toBeInstanceOf(Node)
    )
  })

  it('handles no requests', () => {
    expect(node.request).toBeUndefined()
  })

  it('creates requests when present', () => {
    expect(child.request).toBeInstanceOf(Request)
    expect(child.request.request).toEqual(fixture.item[0].request)
    expect(child.request.responses).toEqual(fixture.item[0].response)
  })

  describe('ancestors', () => {
    expect(child.ancestors).toEqual(['Root', 'Event Bookings'])
  })
})
