import { FunctionComponent, useState, Fragment } from "react"
import { List } from './list'
import React from "react"
import {Box, Color, useInput} from "ink"
import {Collection} from "@/types/postman/collection"
import TextInput from 'ink-text-input'
import {CollectionPages} from "@/src/constants"

type ChooseRequestProps = {
  collection: Collection
  go: (page: CollectionPages) => void
}

export const ChooseRequest: FunctionComponent<ChooseRequestProps> = ({ collection, go }) => {
  const [filter, setFilter] = useState('')

  useInput(input => {
    if (input === '?') return go(CollectionPages.Menu)
  })

  return <Fragment>
    <List collection={collection} filter={filter} />
    <Box marginTop={1}>
      <Color gray>{'> '}</Color>
      <Color gray={ filter.length === 0 }>
        <TextInput value={filter} onChange={setFilter} placeholder="Search (? for menu)" />
      </Color>
    </Box>
  </Fragment>
}
