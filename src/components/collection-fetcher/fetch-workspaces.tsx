import React, { useEffect, FunctionComponent } from 'react'
import PostmanClient from '@/src/services/postman-client'
import { Loader } from '@/src/components//util/loader'
import PatError from '@/src/models/pat-error'
import { useAsyncFetch } from '@/src/utils/use-async'

type FetchWorkspacesProps = {
  client: PostmanClient
  set: Function
}

export const FetchWorkspaces: FunctionComponent<FetchWorkspacesProps> = ({ client, set }) => {
  useAsyncFetch(
    () => client.workspaces(),
    workspaces => {
      if (!workspaces.length) throw new PatError('Could not find any workspaces')
      set(workspaces)
    }
  )

  return <Loader>Fetching workspaces</Loader>
}

