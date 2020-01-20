import { BaseCollectionAttributes } from './collection'
import { BaseEnvironmentAttributes } from './environments'

export interface BaseWorkspaceAttributes {
  id: string
  type: string
  name: string
}

export interface Workspace extends BaseWorkspaceAttributes {
  collections: BaseCollectionAttributes[]
  description: string
  environments: BaseEnvironmentAttributes[]
  mocks: BaseMockAttributes[]
  monitors: BaseMonitorAttributes[]
}

export interface BaseMonitorAttributes {
  id: string
}

export interface BaseMockAttributes {
  id: string
}
