import PostmanClient from "@/src/services/postman-client"
import React, { FunctionComponent, useEffect } from "react"
import Loader from "../util/loader"
import { GlobalState } from "@/src/services/global-context"
import { Environment } from "@/types/postman/environments"

type FetchEnvironmentsProps = {
  client: PostmanClient
  set: (collection: Environment[]) => void
}

export const FetchEnvironments: FunctionComponent<FetchEnvironmentsProps> = ({ client, set }) => {
  const { state: { dispatch } } = GlobalState.useContainer()

  useEffect(() => {
    const fetch = async () => {
      try {
        const environments = await client.environments()
        set(environments)
      } catch (error) { dispatch({ error }) }
    }

    fetch()
  }, [])

  return <Loader>Fetching environments</Loader>

}

