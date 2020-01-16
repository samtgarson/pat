import PostmanClient from "@/src/services/postman-client"
import React, { FunctionComponent, useEffect } from "react"
import Loader from "../util/loader"
import { useGlobal } from "@/src/services/global-context"

type FetchCollectionProps = {
  client: PostmanClient,
  set: Function,
  id: string
}

export const FetchCollection: FunctionComponent<FetchCollectionProps> = ({ client, set, id }) => {
  const { setError } = useGlobal()

  useEffect(() => {
    const fetch = async () => {
      try {
        const collection = await client.collection(id)
        set(collection)
      } catch (e) { setError(e) }
    }

    fetch()
  }, [])

  return <Loader>Fetching your collection</Loader>

}

