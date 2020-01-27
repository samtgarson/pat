import { Request } from "@/src/models/request"
import React, { FunctionComponent, useMemo } from "react"
import { Text, Color, Box } from 'ink'
import { HighlightText } from "@/src/components/util/highlight"
import { Method } from "@/types/postman/collection"

type SummaryProps = {
  request: Request
  query: { [key: string]: string }
  params: { [key: string]: string }
}

const urlMatcher = /[/&]/g

const methodColors = {
  [Method.Get]: 'bgBlue',
  [Method.Post]: 'bgGreen',
  [Method.Patch]: 'bgCyan',
  [Method.Put]: 'bgCyan',
  [Method.Delete]: 'bgRed'
}

export const Summary: FunctionComponent<SummaryProps> = ({ request, query, params }) => {
  const formattedQuery = useMemo(() => request.formatQuery(query), [query])
  return (
    <Text>
      <Box marginRight={1} flexShrink={0}>
        <Color {...{ [methodColors[request.method]]: true, black: true } }> { request.method } </Color>
      </Box>
      <Box flexShrink={0}><Color grey>{ request.host }</Color></Box>
      <HighlightText text={request.formatPath(params)} match={urlMatcher} color='white' />
      { formattedQuery.length > 0 && <Box textWrap='truncate'><Text>
        <Color blueBright>?</Color>
        <HighlightText text={formattedQuery} match={urlMatcher} color='gray' />
      </Text></Box>}
    </Text>
  )
}
