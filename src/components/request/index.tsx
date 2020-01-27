import React, { FunctionComponent, useState, useMemo } from "react"
import { GlobalState } from "@/src/services/global-context"
import { Node } from "@/src/models/node"
import Section from "@/src/components/util/section"
import { useMenu } from "@/src/services/menu"
import { Summary } from "@/src/components/request/summary"
import { MenuItems } from "@/types/menu"
import { Editor } from './editor'
import { useCursor } from "@/src/services/use-cursor"
import { hshToKeyValue } from "@/src/utils/key-value-converter"

export const Request: FunctionComponent = () => {
  const { route: { params: routeParams } } = GlobalState.useContainer()
  useMenu([MenuItems.SwitchRequest, MenuItems.Env, MenuItems.SwitchEnv])

  const node: Node = routeParams.node
  const { request } = node
  if (!node || !request) return null

  const [query, setQuery] = useState(request.query)
  const queryArray = useMemo(() => hshToKeyValue(query), [query])

  const [params, setParams] = useState(request.variables)
  const paramArray = useMemo(() => hshToKeyValue(params), [params])

  const { cursor } = useCursor(queryArray.length + paramArray.length)

  return <Section title={ node.name }>
    <Summary request={request} query={query} params={params} />
    { request.hasQuery && <Editor
      title='Query Params:'
      items={queryArray}
      cursor={cursor}
      update={({ key, value }) => setQuery({ ...query, [key]: value })}
    /> }
    { request.hasVariables && <Editor
      title='URL Params:'
      items={paramArray}
      cursor={cursor - queryArray.length}
      update={({ key, value }) => setParams({ ...params, [key]: value })}
    /> }
  </Section>
}
