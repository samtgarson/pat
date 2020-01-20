import PostmanClient from "@/src/services/postman-client"
import React, { FunctionComponent, useEffect } from "react"
import Loader from "../util/loader"
import { GlobalState } from "@/src/services/global-context"
import {Collection} from "@/types/postman/collection"

type FetchCollectionProps = {
  client: PostmanClient,
  set: (collection: Collection) => void
  id: string
}

export const FetchCollection: FunctionComponent<FetchCollectionProps> = ({ client, set, id }) => {
  const { state: { setState } } = GlobalState.useContainer()

  useEffect(() => {
    const fetch = async () => {
      try {
        const collection = await client.collection(id)
        set(collection)
      } catch (error) { setState({ error }) }
    }

    fetch()
  }, [])

  return <Loader>Fetching your collection</Loader>

}

