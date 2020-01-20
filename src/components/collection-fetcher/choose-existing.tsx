import React, { FunctionComponent, useMemo } from "react"
import { GlobalState } from "@/src/services/global-context"
import {ChooseCollection} from "@/src/components/collection-fetcher/choose-collection"
import {StoredCollection} from "@/types/config"
import {Collection} from "@/types/postman/collection"

type ChooseExistingProps = {
  done: (collection: Collection) => void
  chooseNew: Function
}

export const ChooseExisting: FunctionComponent<ChooseExistingProps> = ({ done, chooseNew }) => {
  const { config } = GlobalState.useContainer()

  const collections = useMemo(
    () => Object.values(config.get('collections') || {}) as StoredCollection[],
    [config]
  )

  const getApiKey = (collectionID: string): string => {
    const { workspaceID } = collections.find(c => c.uid === collectionID) || {}
    const { apiKey } = workspaceID && config.get('workspaces')[workspaceID]
    return apiKey
  }

  return <ChooseCollection chooseNew={chooseNew} set={done} allowNew={true} collections={collections} getApiKey={getApiKey}/>
}
