import React, { useEffect, FunctionComponent, useMemo } from 'react'
import PostmanClient from '@/src/services/postman-client'
import Loader from '@/src/components//util/loader'
import PatError from '@/src/models/pat-error'
import { GlobalState } from "@/src/services/global-context"
import { keyValueToHash } from '@/src/utils/key-value-converter'

type FetchEnvironmentProps = {
  id: string
}

export const FetchEnvironment: FunctionComponent<FetchEnvironmentProps> = ({ id }) => {
  const { state: { dispatch, apiKey } } = GlobalState.useContainer()
  const client = useMemo(() => apiKey && new PostmanClient(apiKey), [apiKey])

  useEffect(() => {
    const fetch = async () => {
      if (!client) return
      try {
        const env = await client.environment(id)
        const environment = keyValueToHash(env.values)
        dispatch({ environment })
      } catch (err) {
        const error = new PatError(`Could not fetch environment ${id}`, err)
        dispatch({ error })
      }
    }

    fetch()
  }, [client])

  return <Loader>Fetching environment</Loader>
}

