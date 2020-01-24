import React, { FunctionComponent, useMemo } from "react"
import { GlobalState } from "@/src/services/global-context"
import { ChooseCollection } from "@/src/components/collection-fetcher/choose-collection"
import { StoredCollection } from "@/types/config"
import { Collection } from "@/types/postman/collection"

type ChooseExistingProps = {
  done: (collection: Collection, apiKey: string, workspaceID: string) => void
  chooseNew: Function
  collectionID?: string
}

export const ChooseExisting: FunctionComponent<ChooseExistingProps> = ({ done, chooseNew, collectionID }) => {
  const { config } = GlobalState.useContainer()

  const collections = useMemo(
    () => Object.values(config.get('collections') || {}) as StoredCollection[],
    [config]
  )

  const getWorkspaceID = (collectionID: string) => {
     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
     const { workspaceID } = collections.find(c => c.uid === collectionID)!
     return workspaceID
  }

  const getApiKey = (collectionID: string): string => {
    const workspaceID = getWorkspaceID(collectionID)
    const { apiKey } = workspaceID && config.get('workspaces')[workspaceID]
    return apiKey
  }

  const setCollection = (collection: Collection) => {
    const workspaceID = getWorkspaceID(collection.uid)
    const apiKey = getApiKey(collection.uid)
    done(collection, apiKey, workspaceID)
  }

  return <ChooseCollection
    collectionID={collectionID}
    chooseNew={chooseNew}
    set={setCollection}
    allowNew={true}
    collections={collections}
    getApiKey={getApiKey}
  />
}
