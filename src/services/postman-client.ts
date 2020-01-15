import axios from 'axios'
import { Collection } from '@/types/postman/collection'
import { Workspace, BaseWorkspaceAttributes } from '@/types/postman/workspace'

type CollectionResponse = {
  collection: Collection;
}

type WorkspacesResponse = {
  workspaces: BaseWorkspaceAttributes[];
}

type WorkspaceResponse = {
  workspace: Workspace;
}

class PostmanClient {
  constructor (private apiKey: string) {}

  private get client () {
    return axios.create({
      baseURL: 'https://api.getpostman.com/',
      headers: { 'X-Api-Key': this.apiKey },
    })
  }

  async collection (id: string) {
    const { data: { collection } } = await this.client.get<CollectionResponse>(`/collections/${id}`)
    return collection
  }

  async workspaces () {
    const { data: { workspaces } } = await this.client.get<WorkspacesResponse>('/workspaces')
    return workspaces
  }

  async workspace (id: string) {
    const { data: { workspace } } = await this.client.get<WorkspaceResponse>(`/workspaces/${id}`)
    return workspace
  }
}

export default PostmanClient
