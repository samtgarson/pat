import React, { FunctionComponent, useState } from 'react'
import { GlobalState } from '@/src/services/global-context'
import { ChooseExisting } from '@/src/components/collection-fetcher/choose-existing'
import { ChooseNew } from '@/src/components/collection-fetcher/choose-new'
import { Collection } from '@/types/postman/collection'
import { Pages } from '@/src/constants'


const CollectionFetcher: FunctionComponent = () => {
  const { config, go, state: { setState } } = GlobalState.useContainer()
  const existingCollections = config.get('collections') || {}
  const [collections, setCollections] = useState(Object.values(existingCollections))

  const done = (collection: Collection) => {
    setState({ collection })
    go(Pages.List)
  }

  if (collections.length) {
    return <ChooseExisting done={done} chooseNew={() => setCollections([])} />
  } else {
    return <ChooseNew done={done} />
  }

}

export default CollectionFetcher

