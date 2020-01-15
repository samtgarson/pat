import React, { FunctionComponent, useEffect, useContext } from 'react'
import PostmanClient from '@/src/services/postman-client'
import Loader from '@/src/components/util/loader'
import { ErrorContext } from '@/src/components/util/error'
import PatError from '@/src/services/pat-error'

type FetchWorkspaceProps = {
  client: PostmanClient,
  set: Function,
  id: string
}

export const FetchWorkspace: FunctionComponent<FetchWorkspaceProps> = ({ client, set, id }) => {
  const { setError } = useContext(ErrorContext)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { collections } = await client.workspace(id)
        if (!collections.length) throw new PatError('Could not find any collections in that workspace')

        set(collections)
      } catch (e) { setError(e) }
    }

    fetch()
  }, [])

  return <Loader>Fetching collections</Loader>
}

