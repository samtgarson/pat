import React, { FunctionComponent, useState, useMemo, useCallback } from "react"
import Section from "@/src/components/util/section"
import { Summary } from "@/src/components/request/summary"
import { Form } from '@/src/components/util/form'
import { useCursor } from "@/src/services/use-cursor"
import { hshToKeyValue } from "@/src/utils/key-value-converter"
import { Button } from "@/src/components/util/button"
import { Box } from "ink"
import { Request } from "@/src/models/request"
import { PlainObj } from "@/types/postman/misc"
import { edit } from "@/src/services/spawner"
import { GlobalState } from "@/src/services/global-context"

enum Buttons {
  Send = 'SEND',
  Back = 'BACK',
  Body = 'BODY'
}

type PrepareRequestProps = {
  request: Request
  title: string
  back: () => void
  send: (query?: PlainObj, params?: PlainObj, body?: string) => void
}

export const PrepareRequest: FunctionComponent<PrepareRequestProps> = ({ request, title, back, send }) => {
  const { rerender } = GlobalState.useContainer()
  const [query, setQuery] = useState(request.query)
  const queryArray = useMemo(() => hshToKeyValue(query), [query])

  const [params, setParams] = useState(request.variables)
  const paramArray = useMemo(() => hshToKeyValue(params), [params])

  const [body, setBody] = useState(request.body)
  const editBody = useCallback(async () => {
    const newBody = await edit(body)
    setBody(newBody)
    rerender()
  }, [body])

  const items = useMemo(() => {
    const items: any[] = [...paramArray, ...queryArray]
    if (request.hasBody) items.push(Buttons.Body)
    items.push(Buttons.Send, Buttons.Back)
    return items
  }, [queryArray, paramArray])

  const { cursor } = useCursor(items.length)
  const selectedItem = useMemo(() => items[cursor], [cursor])

  const onHit = useCallback(() => {
    send(query, params, body)
  }, [query, params, body])

  return <Section title={ title }>
    <Summary request={request} query={query} params={params} />
    { request.hasQuery && <Form
      title='Query Params:'
      items={queryArray}
      cursor={cursor}
      update={({ key, value }) => setQuery({ ...query, [key]: value })}
    /> }
    { request.hasVariables && <Form
      title='URL Params:'
      items={paramArray}
      cursor={cursor - queryArray.length}
      update={({ key, value }) => setParams({ ...params, [key]: value })}
    /> }
    <Box marginTop={1} flexDirection='column'>
      { request.hasBody && (
        <Button label="Edit request body" color='blue' selected={selectedItem === Buttons.Body} onHit={editBody} />
      ) }
      <Button label="Send Request" selected={selectedItem === Buttons.Send} onHit={onHit} />
      <Button label="Back" selected={selectedItem === Buttons.Back} color='blue' onHit={back} />
    </Box>
  </Section>
}
