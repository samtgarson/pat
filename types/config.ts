import { BaseEnvironmentAttributes, Environment } from "./postman/environments"
import { BaseCollectionAttributes } from "./postman/collection"

export type StoredWorkspace = {
  apiKey: string
  name: string
  id: string
}

export interface StoredCollection extends BaseCollectionAttributes {
  workspaceID: string
  environment?: { [key: string]: string }
}

export interface StoredEnvironment extends BaseEnvironmentAttributes {
  workspaceID: string
}
