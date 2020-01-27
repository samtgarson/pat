import React, { FunctionComponent, useState } from "react"
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
  const { route: { params } } = GlobalState.useContainer()
  useMenu([MenuItems.SwitchRequest, MenuItems.Env, MenuItems.SwitchEnv])

  const node: Node = params.node
  const { request } = node
  if (!node || !request) return null

  const [query, setQuery] = useState(request.query)
  const { cursor } = useCursor(Object.keys(query).length)

  return <Section title={ node.name }>
    <Summary request={request} query={query} />
    { request.hasQuery && <Editor
      title='Query Params:'
      items={hshToKeyValue(query)}
      cursor={cursor}
      update={({ key, value }) => setQuery({ ...query, [key]: value })}
    /> }
  </Section>
}
