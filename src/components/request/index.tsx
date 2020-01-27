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
import { Button } from "@/src/components/util/button"
import { Box } from "ink"

enum Buttons {
  Send = 'SEND',
  Back = 'BACK',
  Body = 'BODY'
}

export const Request: FunctionComponent = () => {
  const { route: { params: routeParams, back }, state: { environment } } = GlobalState.useContainer()
  useMenu([MenuItems.SwitchRequest, MenuItems.Env, MenuItems.SwitchEnv])

  const node: Node = routeParams.node
  const request = node.request?.withEnv(environment)
  if (!node || !request) return null

  const [query, setQuery] = useState(request.query)
  const queryArray = useMemo(() => hshToKeyValue(query), [query])

  const [params, setParams] = useState(request.variables)
  const paramArray = useMemo(() => hshToKeyValue(params), [params])

  const items = useMemo(() => {
    const items: any[] = [...paramArray, ...queryArray]
    if (request.hasBody) items.push(Buttons.Body)
    items.push(Buttons.Send, Buttons.Back)
    return items
  }, [queryArray, paramArray])


  const { cursor } = useCursor(items.length)
  const selectedItem = useMemo(() => items[cursor], [cursor])

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
    <Box marginTop={1} flexDirection='column'>
      { request.hasBody && <Button label="Edit request body" color='blue' selected={selectedItem === Buttons.Body} onHit={() => { console.log('ok') }} /> }
      <Button label="Send Request" selected={selectedItem === Buttons.Send} onHit={() => { console.log('ok') }} />
      <Button label="Back" selected={selectedItem === Buttons.Back} color='blue' onHit={back} />
    </Box>
  </Section>
}
