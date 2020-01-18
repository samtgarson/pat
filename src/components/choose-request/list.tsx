import React from 'react'
import { FunctionComponent, useMemo } from "react"
import { Collection } from '@/types/postman/collection'
import { Tree } from "@/src/models/node"
import { SearchCandidate } from '@/src/models/node'
import { Color } from 'ink'
import { QuickScore, QuickScoreResult } from 'quick-score'
import { WindowFactory } from '@/src/components/util/window'
import {Result} from './result'

type ListProps = {
  collection: Collection,
  filter: string,
}

const Window = WindowFactory<QuickScoreResult<SearchCandidate>>()

const emptyMessage = () => <Color gray>No matching requests.</Color>

export const List: FunctionComponent<ListProps> = ({ collection, filter }) => {
  const tree = new Tree(collection)
  const sort = new QuickScore<SearchCandidate>(tree.searchCandidates(), ['searchText', 'name'])
  const results = useMemo(() => sort.search(filter), [filter])

  return <Window items={results} maxHeight={10} emptyMessage={emptyMessage}>
    { (r, selected) => <Result key={r.item.node.id} matches={r.matches} {...r.item} selected={selected} emptyFilter={filter.length === 0} /> }
  </Window>
}
