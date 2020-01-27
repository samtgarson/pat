import { Request } from "@/src/models/request"
import React, { FunctionComponent } from "react"
import { Text, Color, Box } from 'ink'
import { HighlightText } from "@/src/components/util/highlight"
import { Method } from "@/types/postman/collection"

type SummaryProps = {
  request: Request
  query: { [key: string]: string }
  params: { [key: string]: string }
}

const urlMatcher = /[/,&]/g

const methodColors = {
  [Method.Get]: 'bgBlue',
  [Method.Post]: 'bgGreen',
  [Method.Patch]: 'bgCyan',
  [Method.Put]: 'bgCyan',
  [Method.Delete]: 'bgRed'
}

export const Summary: FunctionComponent<SummaryProps> = ({ request, query, params }) => (
  <Text>
    <Box marginRight={1}>
      <Color {...{ [methodColors[request.method]]: true, black: true } }> { request.method } </Color>
    </Box>
    <Color grey>{ request.host }</Color>
    <HighlightText text={request.formatPath(params)} match={urlMatcher} color='white' />
    { request.hasQuery && <Text>
      <Color blueBright>?</Color>
      <HighlightText text={Request.formatQuery(query)} match={urlMatcher} color='gray' />
    </Text>}
  </Text>
)
