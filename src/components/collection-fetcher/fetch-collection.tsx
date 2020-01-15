import PostmanClient from "@/src/services/postman-client"
import { FunctionComponent, useEffect, useContext } from "react"
import Loader from "../util/loader"
import React from "react"
import { ErrorContext } from "../util/error"

type FetchCollectionProps = {
  client: PostmanClient,
  set: Function,
  id: string
}

export const FetchCollection: FunctionComponent<FetchCollectionProps> = ({ client, set, id }) => {
  const { setError } = useContext(ErrorContext)

  useEffect(() => {
    const fetch = async () => {
      try {
        const collection  = await client.collection(id)
        set(collection)
      } catch (e) { setError(e) }
    }

    fetch()
  }, [])

  return <Loader>Fetching your collection</Loader>
}

