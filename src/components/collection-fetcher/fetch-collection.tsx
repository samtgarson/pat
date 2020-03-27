import PostmanClient from "@/src/services/postman-client"
import React, { FunctionComponent, useEffect } from "react"
import { Loader } from "../util/loader"
import { Collection } from "@/types/postman/collection"
import { useAsyncFetch } from "@/src/utils/use-async"

type FetchCollectionProps = {
  client: PostmanClient
  set: (collection: Collection) => void
  id: string
}

export const FetchCollection: FunctionComponent<FetchCollectionProps> = ({ client, set, id }) => {
  useAsyncFetch(() => client.collection(id), set)

  return <Loader>Fetching your collection</Loader>

}

