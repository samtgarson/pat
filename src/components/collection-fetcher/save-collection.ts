import Conf = require("conf")
import { Collection } from "@/types/postman/collection"
import { Workspace } from "@/types/postman/workspace"
import { StoredWorkspace, StoredCollection, StoredEnvironment } from "@/types/config"

export const saveCollection = (config: Conf, collection: Collection, workspace: Workspace, apiKey: string) => {
  const workspaceKey = `workspaces.${workspace.id}`
  if (!config.has(workspaceKey)) {
    const storedWorkspace: StoredWorkspace = { id: workspace.id, apiKey, name: workspace.name }
    config.set(workspaceKey, storedWorkspace)
  }

  const collectionKey = `collections.${collection.uid}`
  const collectionToSave: StoredCollection = { name: collection.info.name, uid: collection.uid, workspaceID: workspace.id }
  config.set(collectionKey, collectionToSave)

  workspace.environments.forEach(e => {
    const environmentsKey = `environments.${e.uid}`
    const environmentToSave: StoredEnvironment = { ...e, workspaceID: workspace.id }
    config.set(environmentsKey, environmentToSave)
  })
}
