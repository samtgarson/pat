import React, { useState, FunctionComponent, useMemo, useEffect, useCallback } from 'react'
import PostmanClient from '@/src/services/postman-client'
import { FetchWorkspaces } from './fetch-workspaces'
import { ChooseWorkspace } from './choose-workspace'
import { FetchWorkspace } from './fetch-workspace'
import { ChooseCollection } from './choose-collection'
import { FetchCollection } from './fetch-collection'
import { SaveCollection } from './save-collection'
import { Collection } from '@/types/postman/collection'
import { BaseWorkspaceAttributes } from '@/types/postman/workspace'
import { useGlobal, StoredCollection } from '@/src/services/global-context'
import { AskForApiKey } from '@/src/components/collection-fetcher/ask-for-api-key'
import { NEW_COLLECTION } from '@/src/constants'

type CollectionFetcherProps = {
  set: Function;
}

const CollectionFetcher: FunctionComponent<CollectionFetcherProps> = ({ set }) => {
  const { config } = useGlobal()
  const existingCollections: StoredCollection[] = Object.values(config.get('collections'))

  const [workspaces, setWorkspaces] = useState<BaseWorkspaceAttributes[]>()
  const [workspaceID, setWorkspaceID] = useState()
  const [apiKey, setApiKey] = useState()
  const [collections, setCollections] = useState(existingCollections)
  const [collectionID, setCollectionID] = useState()
  const [selected, setSelected] = useState<Collection>()
  const client = useMemo(() => apiKey && new PostmanClient(apiKey), [apiKey])

  useEffect(() => {
  }, [collectionID])

  const done = useCallback(() => {
    set(selected)
  }, [selected])

  // Once we have chosen a collection, we offer to save it
  if (selected) return (
    <SaveCollection collection={selected} apiKey={apiKey} done={done} />
  )

  // If we have chosen a collection, we'll need to fetch the full object
  if (collectionID) {
    if (collectionID === NEW_COLLECTION) {
      setCollections([])
      setCollectionID(undefined)
      return null
    }
    // And if that collection was saved from previously, we can get the API key from it
    if (!apiKey) setApiKey(config.get(`collections.${collectionID}`).apiKey)

    return <FetchCollection client={client} set={setSelected} id={collectionID} />
  }

  // If we have collections (either from API or saved config), we need to choose one
  if (collections.length) {
    // we only allow new collections if we're displaying the saved collections
    const allowNew = collections.length === existingCollections.length
    return (<ChooseCollection set={setCollectionID} collections={collections as StoredCollection[]} allowNew={allowNew}/>)
  }

  // We have a workspace ID, so let's fetch the full workspace to get the collections
  if (workspaceID) return (
    <FetchWorkspace client={client} set={setCollections} id={workspaceID} />
  )

  // We have fetched workspaces, we need to choose one
  if (workspaces) return (
      <ChooseWorkspace set={setWorkspaceID} workspaces={workspaces} />
  )

  // We only have an api key, let's get some workspaces
  if (apiKey) return (
    <FetchWorkspaces client={client} set={setWorkspaces} />
  )

  // We have nothing, we'll need an API key to start
  return (
    <AskForApiKey set={setApiKey} />
  )
}

export default CollectionFetcher

