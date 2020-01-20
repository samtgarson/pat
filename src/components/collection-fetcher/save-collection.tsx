import { FunctionComponent, useState, useCallback } from "react"
import { Box } from "ink"
import { SectionTitle } from "@/src/components/util/section"
import { GlobalState } from '@/src/services/global-context'
import ConfirmInput from 'ink-confirm-input'
import React from "react"
import { Collection } from "@/types/postman/collection"
import { Workspace } from "@/types/postman/workspace"
import { StoredWorkspace, StoredEnvironment, StoredCollection } from "@/types/config"

type SaveCollectionProps = {
  collection: Collection
  apiKey: string
  done: Function
  workspace: Workspace
}

export const SaveCollection: FunctionComponent<SaveCollectionProps> = ({ collection, workspace, apiKey, done }) => {
  const { config } = GlobalState.useContainer()
  const [value, setValue] = useState()

  const onSubmit = useCallback((val: boolean) => {
    if (val) {
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
    done()
  }, [value, collection, apiKey])

  return <Box>
    <SectionTitle title="Save this collection for next time? (Y/n) " />
    <ConfirmInput value={value} onChange={setValue} onSubmit={onSubmit} isChecked />
  </Box>
}
