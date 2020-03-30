import React, { FunctionComponent, useCallback, useState } from "react"
import { GlobalState } from "@/src/services/global-context"
import { Node } from "@/src/models/node"
import { useMenu } from "@/src/services/menu"
import { MenuItems } from "@/types/menu"
import { PrepareRequest } from "@/src/components/request/prepare"
import { PlainObj } from "@/types/postman/misc"
import { SendRequest } from "@/src/components/request/send-request"

export const Request: FunctionComponent = () => {
  const { clear, route: { params: routeParams, back }, state: { environment, authentication } } = GlobalState.useContainer()
  useMenu([MenuItems.SwitchRequest, MenuItems.Env, MenuItems.SwitchEnv, MenuItems.Auth])

  const node: Node = routeParams.node
  const request = node.request?.withConfig(environment, authentication)
  if (!node || !request) return null

  const [args, setArgs] = useState()

  const goAgain = useCallback(() => {
    clear()
    setArgs(undefined)
  }, [args])

  const send = useCallback(async (query?: PlainObj, params?: PlainObj, body?: string) => {
    setArgs({ query, params, body })
  }, [request])

  if (args) return <SendRequest args={args} request={request} again={goAgain} />
  return <PrepareRequest back={back} request={request} title={node.name} send={send} />
}
