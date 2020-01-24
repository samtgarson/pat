import React, { FunctionComponent, useState, useMemo, useCallback } from "react"
import { WindowFactory } from "@/src/components/util/window"
import { EnvironmentVariable } from "@/types/postman/environments"
import Section from "@/src/components/util/section"
import { GlobalState } from "@/src/services/global-context"
import { Box, Color, Text } from "ink"
import Input from 'ink-text-input'
import figures from "figures"

type EnvironmentItemProps = {
  item: EnvironmentVariable
  selected: boolean
  keyWidth: number
  update: (item: EnvironmentVariable) => void
}

const EnvironmentItem: FunctionComponent<EnvironmentItemProps> = ({ item, selected, keyWidth, update }) => {

  return <Box>
    <Color blue>{ selected ? figures.pointer : ' '} </Color>
    <Box width={keyWidth + 2}><Color white>{ item.key }: </Color></Box>
    { selected
      ? <Input value={item.value} onChange={value => update({ ...item, value })} />
      : <Text>{ item.value }</Text>
    }
  </Box>
}

const updateValues = (arr: Array<EnvironmentVariable>, item: EnvironmentVariable) => arr.map(i => {
  if (item.key === i.key) return item
  return i
})

export const EnvironmentItems: FunctionComponent = () => {
  const { state: { environment, dispatch } } = GlobalState.useContainer()
  const [cursor, setCursor] = useState(0)
  const Window = WindowFactory<EnvironmentVariable>()
  const keyWidth = useMemo(
    () => environment
      ? environment
        .values
        .reduce((prev, { key }) => Math.max(prev, key.length), 0)
      : 0,
    [environment]
  )

  const update = useCallback((item: EnvironmentVariable) => environment && dispatch({
    environment: {
      ...environment,
      values: updateValues(environment.values, item)
    }
  }), [environment])

  if (!environment) return null
  return <Section title="Edit environment:">
    <Window selected={cursor} onChange={setCursor} items={environment.values}>
      { (item, selected) => <EnvironmentItem update={update} key={item.key} keyWidth={keyWidth} item={item} selected={selected} /> }
    </Window>
  </Section>

}
