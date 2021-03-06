import React from 'react'
import { FunctionComponent } from "react"
import { SearchCandidate } from '@/src/models/node'
import { Text, Color, Box } from 'ink'
import { Highlight } from '@/src/components/util/highlight'
import figures from 'figures'

interface ResultProps extends SearchCandidate {
  matches: {
    [field in keyof SearchCandidate]: [number, number][];
  }
  selected: boolean
  emptyFilter: boolean
}

export const Result: FunctionComponent<ResultProps> = ({ name, ancestors, matches,  selected }) => {
  const requestColor = { [selected ? 'blueBright' : 'whiteBright']: true }
  const directoryColor = { [selected ? 'blue' : 'white']: true }
  const pointer = selected ? `${figures.pointer} ` : '  '

  const ancestorLabels = ancestors.map(a => (
    <Box marginRight={1} flexShrink={1} key={a} textWrap='truncate'>
      <Color {...directoryColor}>{a + ' ' + figures.arrowRight }</Color>
    </Box>
  ))

  return <Box>
    <Color blue>{pointer}</Color>
    {ancestorLabels}
    <Box textWrap='truncate' flexShrink={0}>
      <Color {...requestColor}>
        <Highlight text={name} matches={matches.name}>
          {text => <Text bold><Color {...requestColor}>{text}</Color></Text>}
        </Highlight>
      </Color>
    </Box>
  </Box>
}

