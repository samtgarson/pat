import { FunctionComponent, useState, Fragment } from "react"
import { List } from './list'
import React from "react"
import { Box, Color, useInput } from "ink"
import TextInput from 'ink-text-input'
import { Pages } from "@/src/constants"
import { GlobalState } from "@/src/services/global-context"

export const ChooseRequest: FunctionComponent = () => {
  const { route: { go }, state: { collection } } = GlobalState.useContainer()
  if (!collection) return null

  const [filter, setFilter] = useState('')

  useInput(input => {
    if (input === '?') return go(Pages.Menu)
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
