import React, { FunctionComponent, useState } from 'react'
import { GlobalState } from '@/src/services/global-context/index'
import { ChooseExisting } from '@/src/components/collection-fetcher/choose-existing'
import { ChooseNew } from '@/src/components/collection-fetcher/choose-new'
import { Collection } from '@/types/postman/collection'
import { Pages } from '@/src/constants'
import { State } from '@/src/services/global-context/state'


const CollectionFetcher: FunctionComponent = () => {
  const { config, route: { go, params }, state: { dispatch } } = GlobalState.useContainer()
  const existingCollections = config.get('collections') || {}
  const [collections, setCollections] = useState(Object.values(existingCollections))

  const done = (collection: Collection, apiKey: string, workspaceID: string) => {
    const environmentKey = `collections.${collection.uid}.environment`
    const authenticationKey = `collections.${collection.uid}.authentication`

    const payload: State = { collection, apiKey, workspaceID }
    payload.environment = config.has(environmentKey) ? config.get(environmentKey) : undefined
    payload.authentication = config.has(authenticationKey) ? config.get(authenticationKey) : undefined

    dispatch(payload)
    config.set('lastUsedCollection', collection.uid)

    go(Pages.Home)
  }

  if (params.quickStart && config.has('lastUsedCollection')) {
    const collectionID = config.get('lastUsedCollection')
    return <ChooseExisting done={done} chooseNew={() => setCollections([])} collectionID={collectionID} />
  } else if (collections.length) {
    return <ChooseExisting done={done} chooseNew={() => setCollections([])} />
  } else {
    return <ChooseNew done={done} />
  }

}

export default CollectionFetcher

