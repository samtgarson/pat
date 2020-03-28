import { Request } from "@/src/models/request"
import { Response } from "@/src/models/response"
import { FunctionComponent, useState, Fragment, useCallback, useEffect } from "react"
import { PlainObj } from "@/types/postman/misc"
import Axios, { AxiosError } from "axios"
import { Loader } from "@/src/components/util/loader"
import React from "react"
import { Box } from 'ink'
import { Button } from "@/src/components/util/button"
import { preview } from "@/src/services/spawner"
import { ErrorMessage } from "@/src/components/util/error"
import { useCursor } from "@/src/services/use-cursor"
import { GlobalState } from "@/src/services/global-context"
import { useAsyncFetch } from "@/src/utils/use-async"

type SendRequestProps = {
  request: Request
  args: { query?: PlainObj, params?: PlainObj, body?: string }
  again: () => void
}

const isAxiosError = (e: any): e is AxiosError => !!e.isAxiosError

export const SendRequest: FunctionComponent<SendRequestProps> = ({ request, args: { query, params, body }, again }) => {
  const [response, setResponse] = useState<Response>()
  const [error, setError] = useState()
  const { cursor, setLength } = useCursor(3)
  const [status, setStatus] = useState('')
  const [config, setConfig] = useState()

  const { clear, rerender, route: { back } } = GlobalState.useContainer()

  useAsyncFetch(
    () => request.axiosRequest(query, params, body),
    setConfig
  )
  useEffect(() => {
    setStatus(config ? 'Making request' : 'Generating request config')
  }, [config])

  useAsyncFetch(
    () => {
      if (!config) return
      return Axios(config)
    },
    res => {
      clear()
      setLength(3)
      setResponse(new Response(res))
    },
    e => {
      if (isAxiosError(e) && e.response) return setResponse(new Response(e.response))
      setLength(2)
      setError(e)
    },
    [config]
  )

  const previewResponse = useCallback(() => {
    preview(response?.data, response?.fileType)
    rerender()
  }, [response])

  if (error) return <Fragment>
    <Box marginBottom={1}><ErrorMessage raw={true} error={error} /></Box>
    <Button label='Go again' color='blue' selected={cursor === 0} onHit={again} />
    <Button label='Back' color='blue' selected={cursor === 1} onHit={back} />
  </Fragment>
  if (response) return <Fragment>
    <Box marginBottom={1}>{ response.summary }</Box>
    <Button label='View response body' selected={cursor === 0} onHit={previewResponse} />
    <Button label='Go again' color='blue' selected={cursor === 1} onHit={again} />
    <Button label='Back' color='blue' selected={cursor === 2} onHit={back} />
  </Fragment>
  return <Loader>{ status }...</Loader>
}
