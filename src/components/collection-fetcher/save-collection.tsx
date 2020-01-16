import { FunctionComponent, useState, useCallback } from "react"
import { Box } from "ink"
import { SectionTitle } from "@/src/components/util/section"
import { useGlobal, StoredCollection } from "@/src/services/global-context"
import ConfirmInput from 'ink-confirm-input'
import React from "react"
import {Collection} from "@/types/postman/collection"

type SaveCollectionProps = {
  collection: Collection,
  apiKey: string,
  done: Function
}

export const SaveCollection: FunctionComponent<SaveCollectionProps> = ({ collection, apiKey, done }) => {
  const { config } = useGlobal()
  const [value, setValue] = useState()
  const key = `collections.${collection.uid}`

  if (config.has(key)) {
    done()
    return null
  }

  const onSubmit = useCallback((val: boolean) => {
    if (val) {
      const toSave: StoredCollection = { apiKey, name: collection.info.name, uid: collection.uid }
      config.set(key, toSave)
    }
    done()
  }, [value, collection, apiKey])

  return <Box>
    <SectionTitle title="Save this collection for next time? (Y/n) " />
    <ConfirmInput value={value} onChange={setValue} onSubmit={onSubmit} isChecked />
  </Box>
}
