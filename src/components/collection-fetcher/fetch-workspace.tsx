import React, { FunctionComponent, useEffect } from 'react'
import PostmanClient from '@/src/services/postman-client'
import { Loader } from '@/src/components/util/loader'
import PatError from '@/src/models/pat-error'
import { useAsyncFetch } from '@/src/utils/use-async'

type FetchWorkspaceProps = {
  client: PostmanClient
  setWorkspace: Function
  id: string
}

export const FetchWorkspace: FunctionComponent<FetchWorkspaceProps> = ({ client, setWorkspace, id }) => {
  useAsyncFetch(
    () => client.workspace(id),
    workspace => {
      if (!workspace.collections.length) throw new PatError('Could not find any collections in that workspace')
      setWorkspace(workspace)
    }
  )

  return <Loader>Fetching collections</Loader>
}

