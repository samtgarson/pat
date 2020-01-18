import React from 'react'
import { FunctionComponent, useMemo } from "react"
import { Collection } from '@/types/postman/collection'
import { Tree } from "@/src/models/node"
import { SearchCandidate } from '@/src/models/node'
import { Text, Color, Box } from 'ink'
import { QuickScore, QuickScoreResult } from 'quick-score'
import { Highlight } from '@/src/components/util/highlight'
import { WindowFactory } from '@/src/components/util/window'
import figures from 'figures'

type ChooseRequestProps = {
  collection: Collection,
  filter: string,
}

interface ResultProps extends SearchCandidate {
  matches: { [field in keyof SearchCandidate]: [number, number][] }
  selected: boolean,
  emptyFilter: boolean
}

const Result: FunctionComponent<ResultProps> = ({ name, ancestors, matches, emptyFilter, selected }) => {
  const requestColor = { [selected ? 'blueBright' : emptyFilter ? 'whiteBright' : 'white']: true }
  const highlightColor = { [selected ? 'blueBright' : 'whiteBright']: true }
  const directoryColor = { [selected ? 'blue' : 'grey']: true, dim: selected }
  const pointer = selected ? `${figures.pointer} ` : '  '
  return <Box>
    <Color blue>{ pointer }</Color>
    { ancestors.map(a =>
      <Box marginRight={1} flexShrink={1} key={a} textWrap='truncate'>
        <Color {...directoryColor}>{a + ' >'}</Color>
      </Box>
    ) }
    <Box textWrap='truncate' flexShrink={0}>
      <Color {...requestColor}>
        <Highlight text={name} matches={matches.name}>
          { text => <Text bold><Color {...highlightColor}>{ text }</Color></Text> }
        </Highlight>
      </Color>
    </Box>
  </Box>
}

const Window = WindowFactory<QuickScoreResult<SearchCandidate>>()

const emptyMessage = () => <Color gray>No matching requests.</Color>

export const ChooseRequest: FunctionComponent<ChooseRequestProps> = ({ collection, filter }) => {
  const tree = new Tree(collection)
  const sort = new QuickScore<SearchCandidate>(tree.searchCandidates(), ['searchText', 'name'])
  const results = useMemo(() => sort.search(filter), [filter])

  return <Window items={results} maxHeight={10} emptyMessage={emptyMessage}>
    { (r, selected) => <Result key={r.item.node.id} matches={r.matches} {...r.item} selected={selected} emptyFilter={filter.length === 0} /> }
  </Window>
}
