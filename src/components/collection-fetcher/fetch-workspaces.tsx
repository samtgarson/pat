import React, { useEffect, FunctionComponent } from 'react'
import PostmanClient from '@/src/services/postman-client'
import Loader from '@/src/components//util/loader'
import PatError from '@/src/services/pat-error'
import { useGlobal } from "@/src/services/global-context"

type FetchWorkspacesProps = {
  client: PostmanClient
  set: Function
}

export const FetchWorkspaces: FunctionComponent<FetchWorkspacesProps> = ({client, set}) => {
  const { setError } = useGlobal()

  useEffect(() => {
    const fetch = async () => {
      try {
        const workspaces = await client.workspaces()
        if (!workspaces.length) throw new PatError('Could not find any workspaces')
        set(workspaces)
      } catch (e) { setError(e) }
    }

    fetch()
  }, [])

  return <Loader>Fetching workspaces</Loader>
}

