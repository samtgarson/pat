import axios from 'axios'
import { Collection } from '@/types/postman/collection'
import { Workspace, BaseWorkspaceAttributes } from '@/types/postman/workspace'
import { Environment } from '@/types/postman/environments'

type CollectionResponse = {
  collection: Collection
}

type WorkspacesResponse = {
  workspaces: BaseWorkspaceAttributes[]
}

type WorkspaceResponse = {
  workspace: Workspace
}

type EnvironmentResponse = {
  environment: Environment
}

class PostmanClient {
  constructor (private apiKey: string) {}

  private get client () {
    return axios.create({
      baseURL: 'https://api.getpostman.com/',
      headers: { 'X-Api-Key': this.apiKey }
    })
  }

  async collection (uid: string) {
    const { data: { collection } } = await this.client.get<CollectionResponse>(`/collections/${uid}`)
    return { ...collection, uid }
  }

  async workspaces () {
    const { data: { workspaces } } = await this.client.get<WorkspacesResponse>('/workspaces')
    return workspaces
  }

  async workspace (id: string) {
    const { data: { workspace } } = await this.client.get<WorkspaceResponse>(`/workspaces/${id}`)
    return workspace
  }

  async environment (id: string) {
    const { data: { environment } } = await this.client.get<EnvironmentResponse>(`/environments/${id}`)
    return environment
  }
}

export default PostmanClient
