import { FunctionComponent, useState, Fragment, useCallback } from "react"
import { List } from './list'
import React from "react"
import { Box, Color } from "ink"
import TextInput from 'ink-text-input'
import { Pages } from "@/src/constants"
import { GlobalState } from "@/src/services/global-context"
import { Node } from "@/src/models/node"
import { useMenu } from "@/src/services/menu"

export const ChooseRequest: FunctionComponent = () => {
  const { route: { go }, state: { collection, environment } } = GlobalState.useContainer()
  if (!collection) {
    go(Pages.ChooseCollection)
    return null
  }
  if (!environment) {
    go(Pages.ChooseEnvironment)
    return null
  }

  const [filter, setFilter] = useState('')
  const { showMenu, Menu } = useMenu()

  const onSelect = useCallback((node: Node) => {
    go(Pages.Request, { node })
  }, [])

  const handleInput = useCallback((i: string) => setFilter(i.replace('?', '')), [])

  if (showMenu) return <Menu />

  return <Fragment>
    <List collection={collection} filter={filter} onSelect={onSelect} />
    <Box marginTop={1}>
      <Color gray>{'> '}</Color>
      <Color gray={ filter.length === 0 }>
        <TextInput value={filter} onChange={handleInput} placeholder="Search (? for menu)" />
      </Color>
    </Box>
  </Fragment>
}
