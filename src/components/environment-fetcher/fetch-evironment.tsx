import React, { FunctionComponent, useMemo } from 'react'
import PostmanClient from '@/src/services/postman-client'
import { Loader } from '@/src/components//util/loader'
import PatError from '@/src/models/pat-error'
import { GlobalState } from "@/src/services/global-context"
import { keyValueToHash } from '@/src/utils/key-value-converter'
import { useAsyncFetch } from '@/src/utils/use-async'

type FetchEnvironmentProps = {
  id: string
}

export const FetchEnvironment: FunctionComponent<FetchEnvironmentProps> = ({ id }) => {
  const { state: { apiKey, dispatch } } = GlobalState.useContainer()
  const client = useMemo(() => { if (apiKey) return new PostmanClient(apiKey) }, [apiKey])

  useAsyncFetch(
    () => client && client.environment(id),
    ({ values }) => { dispatch({ environment: keyValueToHash(values) }) },
    err => dispatch({ error: new PatError(`Could not fetch environment ${id}`, err) }),
    [client]
  )

  return <Loader>Fetching environment</Loader>
}

