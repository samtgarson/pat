import React, { FunctionComponent, useEffect } from 'react'
import PostmanClient from '@/src/services/postman-client'
import Loader from '@/src/components/util/loader'
import { useGlobal } from "@/src/services/global-context"
import PatError from '@/src/services/pat-error'

type FetchWorkspaceProps = {
  client: PostmanClient,
  set: Function,
  id: string
}

export const FetchWorkspace: FunctionComponent<FetchWorkspaceProps> = ({ client, set, id }) => {
  const { setError } = useGlobal()

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

