import { FunctionComponent, useState, useMemo } from "react"
import PostmanClient from '@/src/services/postman-client'
import { FetchWorkspaces } from "@/src/components/collection-fetcher/fetch-workspaces"
import React from "react"
import { AskForApiKey } from "@/src/components/collection-fetcher/ask-for-api-key"
import { BaseWorkspaceAttributes, Workspace } from "@/types/postman/workspace"
import { ChooseCollection } from "@/src/components/collection-fetcher/choose-collection"
import { ChooseWorkspace } from "@/src/components/collection-fetcher/choose-workspace"
import { Collection } from "@/types/postman/collection"
import { GlobalState } from "@/src/services/global-context"
import { saveCollection } from "@/src/components/collection-fetcher/save-collection"

type ChooseNewProps = {
  done: (collection: Collection, apiKey: string, workspaceID: string) => void
}

export const ChooseNew: FunctionComponent<ChooseNewProps> = ({ done }) => {
  const { config } = GlobalState.useContainer()
  const [apiKey, setApiKey] = useState<string>()
  const [workspaces, setWorkspaces] = useState<BaseWorkspaceAttributes[]>()
  const [workspace, setWorkspace] = useState<Workspace>()
  const [collection, setCollection] = useState<Collection>()

  const client = useMemo(() => apiKey && new PostmanClient(apiKey), [apiKey])

  if (!client || !apiKey) return (
    <AskForApiKey set={setApiKey} />
  )

  if (collection && workspace) {
    saveCollection(config, collection, workspace, apiKey)

    done(collection, apiKey, workspace.id)
    return null
  }

  if (workspace) return (
    <ChooseCollection getApiKey={ () => apiKey } set={setCollection} allowNew={false} collections={workspace.collections} />
  )

  if (workspaces) return (
    <ChooseWorkspace set={setWorkspace} client={client} workspaces={workspaces} />
  )

  return (
    <FetchWorkspaces client={client} set={setWorkspaces} />
  )

}
