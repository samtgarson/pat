import React, { useState, FunctionComponent } from 'react'
import PostmanClient from '@/src/services/postman-client'
import { FetchWorkspaces } from './fetch-workspaces'
import { ChooseWorkspace } from './choose-workspace'
import { FetchWorkspace } from './fetch-workspace'
import { ChooseCollection } from './choose-collection'
import { FetchCollection } from './fetch-collection'
import { BaseCollectionAttributes } from '@/types/postman/collection'
import { BaseWorkspaceAttributes } from '@/types/postman/workspace'

type CollectionFetcherProps = {
  apiKey: string;
  set: Function;
}


const CollectionFetcher: FunctionComponent<CollectionFetcherProps> = ({ apiKey, set }) => {
  const [collections, setCollections] = useState<BaseCollectionAttributes[]>()
  const [workspaces, setWorkspaces] = useState<BaseWorkspaceAttributes[]>()
  const [workspaceID, setWorkspaceID] = useState()
  const [collectionID, setCollectionID] = useState()

  const client = new PostmanClient(apiKey)

  if (!workspaces) return (
    <FetchWorkspaces client={client} set={setWorkspaces} />
  )

  else if (!workspaceID) return (
    <ChooseWorkspace set={setWorkspaceID} workspaces={workspaces} />
  )

  else if (!collections) return (
    <FetchWorkspace client={client} set={setCollections} id={workspaceID} />
  )

  else if (!collectionID) return (
    <ChooseCollection set={setCollectionID} collections={collections} />
  )

  else return (
    <FetchCollection client={client} set={set} id={collectionID} />
  )
}

export default CollectionFetcher

