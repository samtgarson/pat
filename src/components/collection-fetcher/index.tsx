import React, { FunctionComponent, useState } from 'react'
import { GlobalState } from '@/src/services/global-context'
import { ChooseExisting } from '@/src/components/collection-fetcher/choose-existing'
import { ChooseNew } from '@/src/components/collection-fetcher/choose-new'
import { Collection } from '@/types/postman/collection'
import { Pages } from '@/src/constants'
import { FetchCollection } from '@/src/components/collection-fetcher/fetch-collection'


const CollectionFetcher: FunctionComponent = () => {
  const { config, route: { go, params }, state: { setState } } = GlobalState.useContainer()
  const existingCollections = config.get('collections') || {}
  const [collections, setCollections] = useState(Object.values(existingCollections))

  const done = (collection: Collection) => {
    setState({ collection })
    if (config.has(`collections.${collection.uid}`)) {
      config.set('lastUsedCollection', collection.uid)
    }

    go(Pages.List)
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

