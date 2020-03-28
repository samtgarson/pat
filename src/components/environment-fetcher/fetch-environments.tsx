import PostmanClient from "@/src/services/postman-client"
import React, { FunctionComponent } from "react"
import { Loader } from "../util/loader"
import { Environment } from "@/types/postman/environments"
import { useAsyncFetch } from "@/src/utils/use-async"

type FetchEnvironmentsProps = {
  client: PostmanClient
  set: (collection: Environment[]) => void
}

export const FetchEnvironments: FunctionComponent<FetchEnvironmentsProps> = ({ client, set }) => {
  useAsyncFetch(() => client.environments(), set)

  return <Loader>Fetching environments</Loader>
}

