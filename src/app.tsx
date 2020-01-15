import React, { useState, FunctionComponent } from 'react'
import { Text, Color } from 'ink'
import CollectionFetcher from './components/collection-fetcher/index'
import { Collection } from '@/types/postman/collection'
import { AppOptions } from '@/types/options'
import { ErrorContext, ErrorMessage } from '@/src/components/util/error'

const App: FunctionComponent<AppOptions> = ({ apiKey }) => {
  const [collection, setCollection] = useState<Collection>()
  const [error, setError] = useState()
  const errorContext = { error, setError }

  if (error) return <ErrorMessage error={ error } />

  return (
    <ErrorContext.Provider value={ errorContext }>
      { collection
        ? <Text>
            Using Collection <Color green>{ collection.info.name }</Color>
          </Text>
        : <CollectionFetcher set={ setCollection } apiKey={ apiKey } />
      }
    </ErrorContext.Provider>
  )
}

export default App

