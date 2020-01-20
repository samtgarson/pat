import { FunctionComponent, useState, useCallback } from "react";
import ConfirmInput from 'ink-confirm-input'
import { GlobalState } from "@/src/services/global-context";
import { Box, Color, Text } from "ink";
import React from "react";
import { SectionTitle } from "@/src/components/util/section";
import figures from "figures";
import {Pages} from "@/src/constants";

export const Delete: FunctionComponent = () => {
  const { config, go, state: { collection } } = GlobalState.useContainer()
  if (!collection) return null

  const [value, setValue] = useState()
  const [deleted, setDeleted] = useState(false)
  const key = `collections.${collection.uid}`

  const onSubmit = useCallback((val: boolean) => {
    if (val) {
      config.delete(key)
      setDeleted(true)
    } else go(Pages.List)
  }, [value, collection.uid])

if (deleted) return <Text><Color grey>{ '>' }</Color> <Color green>{ figures.tick }</Color> { `Deleted ${collection.info.name}.` }</Text>

  return <Box>
    <SectionTitle title={`Are you sure you want to delete ${collection.info.name}? (y/N) `}/>
    <ConfirmInput value={value} onChange={setValue} onSubmit={onSubmit} />
  </Box>

}
