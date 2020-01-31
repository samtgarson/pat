import React, { FunctionComponent, useCallback, useState } from "react"
import { GlobalState } from "@/src/services/global-context"
import { Node } from "@/src/models/node"
import { useMenu } from "@/src/services/menu"
import { MenuItems } from "@/types/menu"
import { PrepareRequest } from "@/src/components/request/prepare"
import { PlainObj } from "@/types/postman/misc"
import { SendRequest } from "@/src/components/request/send-request"

export const Request: FunctionComponent = () => {
  const { route: { params: routeParams, back }, state: { environment } } = GlobalState.useContainer()
  useMenu([MenuItems.SwitchRequest, MenuItems.Env, MenuItems.SwitchEnv])

  const node: Node = routeParams.node
  const request = node.request?.withEnv(environment)
  if (!node || !request) return null

  const [args, setArgs] = useState()

  const send = useCallback(async (query?: PlainObj, params?: PlainObj, body?: string) => {
    setArgs({ query, params, body })
  }, [request])

  if (args) return <SendRequest args={args} request={request} again={() => setArgs(undefined)} />
  return <PrepareRequest back={back} request={request} title={node.name} send={send} />
}
