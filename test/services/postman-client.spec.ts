import mockAxios from 'jest-mock-axios'
import PostmanClient from '@/src/services/postman-client'
import {Collection} from '@/types/postman/collection'
import {Workspace} from '@/types/postman/workspace'

const apiKey = 'apiKey'
const id = 'id'

describe('PostmanClient', () => {
  let client: PostmanClient

  beforeEach(() => {
    client = new PostmanClient(apiKey)
  })

  it('creates the correct client', () => {
    client.workspaces()

    expect(mockAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://api.getpostman.com/',
      headers: { 'X-Api-Key': apiKey }
    })
  })

  describe('collection', () => {
    it('calls Postman API', async () => {
      client.collection(id)

      expect(mockAxios.get).toHaveBeenCalledWith(`/collections/${id}`)
    })

    it('returns the collection', () => {
      const collection = {} as Collection
      const expected = { uid: id }

      const response = client.collection(id)
      mockAxios.mockResponse({ data: { collection }})

      return expect(response).resolves.toEqual(expected)
    })
  })

  describe('workspaces', () => {
    it('calls Postman API', async () => {
      client.workspaces()

      expect(mockAxios.get).toHaveBeenCalledWith(`/workspaces`)
    })

    it('returns the workspaces', () => {
      const workspaces = [] as Workspace[]

      const response = client.workspaces()
      mockAxios.mockResponse({ data: { workspaces }})

      return expect(response).resolves.toEqual(workspaces)
    })
  })

  describe('workspace', () => {
    it('calls Postman API', async () => {
      client.workspace(id)

      expect(mockAxios.get).toHaveBeenCalledWith(`/workspaces/${id}`)
    })

    it('returns the workspace', () => {
      const workspace = {} as Workspace

      const response = client.workspace(id)
      mockAxios.mockResponse({ data: { workspace }})

      return expect(response).resolves.toEqual(workspace)
    })
  })
})
