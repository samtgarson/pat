import React, { useState } from 'react'
import { FunctionComponent, useMemo } from "react"
import { Collection } from '@/types/postman/collection'
import { Tree, Node } from "@/src/models/node"
import { SearchCandidate } from '@/src/models/node'
import { Color } from 'ink'
import { QuickScore, QuickScoreResult } from 'quick-score'
import { WindowFactory } from '@/src/components/util/window'
import { Result } from './result'

type ListProps = {
  collection: Collection
  filter: string
  onSelect?: (node: Node) => void
}

const Window = WindowFactory<QuickScoreResult<SearchCandidate>>()

const emptyMessage = () => <Color gray>No matching requests.</Color>

export const List: FunctionComponent<ListProps> = ({ collection, filter, onSelect }) => {
  const tree = new Tree(collection)
  const sort = new QuickScore<SearchCandidate>(tree.searchCandidates(), ['searchText', 'name'])
  const results = useMemo(() => sort.search(filter), [filter])
  const [cursor, setCursor] = useState(0)

  const selectNode = (item: QuickScoreResult<SearchCandidate>) => {
    onSelect && onSelect(item.item.node)
  }

  return <Window items={results} emptyMessage={emptyMessage} onSelect={selectNode} onChange={setCursor} selected={cursor}>
    { (r, selected) => <Result
      key={r.item.node.id}
      matches={r.matches}
      {...r.item}
      selected={selected}
      emptyFilter={filter.length === 0}
    /> }
  </Window>
}
