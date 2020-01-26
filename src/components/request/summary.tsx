import { Request } from "@/src/models/request"
import React, { FunctionComponent } from "react"
import { Text, Color } from 'ink'
import { HighlightText } from "@/src/components/util/highlight"

type SummaryProps = {
  request: Request
}

const urlMatcher = /[/,=]/g

export const Summary: FunctionComponent<SummaryProps> = ({ request }) => (
  <Text>
    <Color grey>{ request.host }</Color>
    <HighlightText text={request.path} match={urlMatcher} color='white' />
    { request.hasQuery && <Text>
      <Color blueBright>?</Color>
      <HighlightText text={request.formattedQuery} match={urlMatcher} color='white' />
    </Text>}
  </Text>
)
