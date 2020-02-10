import { Box, Color, Text } from "ink"
import Input from 'ink-text-input'
import figures from "figures"
import React, { FunctionComponent } from "react"
import { KeyValue } from "@/types/postman/misc"

type KeyValueEditorProps<T extends KeyValue> = {
  item: T
  selected: boolean
  keyWidth: number
  pointer?: Element
  update: (item: T) => void
  secret?: boolean
}

export const getMaxWidth = <T extends KeyValue = KeyValue>(list: T[]) => (
  list.reduce((prev, { key }) => Math.max(prev, key.length), 0)
)

export const KeyValueEditorFactory = <T extends KeyValue = KeyValue>(): FunctionComponent<KeyValueEditorProps<T>> => ({
  item,
  selected,
  keyWidth,
  update,
  pointer = <Color blue>{figures.pointer} </Color>,
  secret = false
}) => (
  <Box>
    { selected ? pointer : '  ' }
    <Box width={keyWidth + 2}><Color white>{ item.key }: </Color></Box>
    { selected
      ? <Input mask={secret ? figures.bullet : undefined} value={item.value} onChange={value => update({ ...item, value })} />
      : <Text>{ secret ? item.value.replace(/./g, figures.bullet) : item.value }</Text>
    }
  </Box>
)

