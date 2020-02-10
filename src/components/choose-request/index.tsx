import { FunctionComponent, useState, useCallback } from "react"
import { List } from './list'
import React from "react"
import { Box, Color } from "ink"
import TextInput from 'ink-text-input'
import { Pages } from "@/src/constants"
import { GlobalState } from "@/src/services/global-context"
import { Node } from "@/src/models/node"
import { useMenu } from "@/src/services/menu"
import { MenuItems } from "@/types/menu"
import Section from "../util/section"

export const ChooseRequest: FunctionComponent = () => {
  const { route: { go }, state: { collection, environment }, config } = GlobalState.useContainer()
  if (!collection) {
    go(Pages.ChooseCollection)
    return null
  }
  if (!environment && config.has('environments')) {
    go(Pages.ChooseEnvironment)
    return null
  }

  useMenu([MenuItems.SwitchCollection, MenuItems.Env, MenuItems.SwitchEnv, MenuItems.Auth, MenuItems.Delete])

  const [filter, setFilter] = useState('')
  const onSelect = useCallback((node: Node) => {
    go(Pages.Request, { node })
  }, [])

  const handleInput = useCallback((i: string) => setFilter(i.replace('?', '')), [])

  return <Section title='Requests:'>
    <List collection={collection} filter={filter} onSelect={onSelect} />
    <Box marginTop={1}>
      <Color gray>{'> '}</Color>
      <Color gray={ filter.length === 0 }>
        <TextInput value={filter} onChange={handleInput} placeholder="Search (? for menu)" />
      </Color>
    </Box>
  </Section>
}
