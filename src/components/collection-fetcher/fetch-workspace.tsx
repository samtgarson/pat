import React, { FunctionComponent, useEffect } from 'react'
import PostmanClient from '@/src/services/postman-client'
import Loader from '@/src/components/util/loader'
import { GlobalState } from "@/src/services/global-context"
import PatError from '@/src/models/pat-error'

type FetchWorkspaceProps = {
  client: PostmanClient
  setWorkspace: Function
  id: string
}

export const FetchWorkspace: FunctionComponent<FetchWorkspaceProps> = ({ client, setWorkspace, id }) => {
  const { state: { dispatch } } = GlobalState.useContainer()

  useEffect(() => {
    const fetch = async () => {
      try {
        const workspace = await client.workspace(id)
        if (!workspace.collections.length) throw new PatError('Could not find any collections in that workspace')

        setWorkspace(workspace)
      } catch (error) { dispatch({ error }) }
    }

    fetch()
  }, [])

  return <Loader>Fetching collections</Loader>
}

