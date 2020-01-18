import React, { useState, FunctionComponent } from 'react'
import { Text, Color } from 'ink'
import CollectionFetcher from './components/collection-fetcher/index'
import { Collection } from '@/types/postman/collection'
import { AppOptions } from '@/types/options'
import { ErrorMessage } from '@/src/components/util/error'
import { GlobalContext, config } from '@/src/services/global-context'
import { Runner } from '@/src/components/runner'

const App: FunctionComponent<AppOptions> = () => {
  const [collection, setCollection] = useState<Collection>()
  const [error, setError] = useState()
  const globalContext = { error, setError, config }

  if (error) return <ErrorMessage error={ error } />

  return (
    <GlobalContext.Provider value={ globalContext }>
      { collection
        ? <Runner collection={collection} back={() => setCollection(undefined)} />
        : <CollectionFetcher set={ setCollection } />
      }
    </GlobalContext.Provider>
  )
}

export default App

