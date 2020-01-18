import { Collection } from "@/types/postman/collection";
import { FunctionComponent, useState, useCallback } from "react";
import ConfirmInput from 'ink-confirm-input'
import {useGlobal} from "@/src/services/global-context";
import { Box, Color, Text } from "ink";
import React from "react";
import { SectionTitle } from "@/src/components/util/section";
import figures from "figures";
import {CollectionPages} from "@/src/constants";

type DeleteProps = {
  collection: Collection,
  go: (page: CollectionPages) => void
}

export const Delete: FunctionComponent<DeleteProps> = ({ collection, go }) => {
  const { config } = useGlobal()
  const [value, setValue] = useState()
  const [deleted, setDeleted] = useState(false)
  const key = `collections.${collection.uid}`

  const onSubmit = useCallback((val: boolean) => {
    if (val) {
      config.delete(key)
      setDeleted(true)
    } else go(CollectionPages.List)
  }, [value, collection.uid])

if (deleted) return <Text><Color grey>{ '>' }</Color> <Color green>{ figures.tick }</Color> { `Deleted ${collection.info.name}.` }</Text>

  return <Box>
    <SectionTitle title={`Are you sure you want to delete ${collection.info.name}? (y/N) `}/>
    <ConfirmInput value={value} onChange={setValue} onSubmit={onSubmit} />
  </Box>

}
