import React, { FunctionComponent, useMemo } from "react"
import { GlobalState } from "@/src/services/global-context"
import { Tree, Node } from "@/src/models/node"
import { Text } from 'ink'

export const Request: FunctionComponent = () => {
  const {
    route: { params }
  } = GlobalState.useContainer()

  const node: Node = params.node
  if (!node) return null

  const { request } = node
  return <Text>{ request?.request.url.path.join('/') }</Text>
}
