import { BaseCollectionAttributes } from "@/types/postman/collection"
import { FunctionComponent } from "react"
import Section from "@/src/components/util/section"
import React from "react"
import Select, { ItemProps } from 'ink-select-input'
import { NEW_COLLECTION } from '@/src/constants'
import {StoredCollection} from "@/src/services/global-context"
import {Color} from "ink"

type ChooseCollectionProps = {
  collections: Extract<StoredCollection[], BaseCollectionAttributes[]>,
  set: Function,
  allowNew: boolean
}

const NEW_COLLECTION_LABEL = 'Add new collection'

const Item: FunctionComponent<ItemProps> = ({ label}) => (
	<Color gray={label === NEW_COLLECTION_LABEL}>
		{label}
	</Color>
)

export const ChooseCollection: FunctionComponent<ChooseCollectionProps> = ({ set, collections, allowNew = false }) => {
  const collectionItems = collections.map(c => ({ value: c.uid, label: c.name }))

  if (allowNew) collectionItems.push({ value: NEW_COLLECTION, label: NEW_COLLECTION_LABEL})

  return (
    <Section title="Select collection:">
      <Select itemComponent={Item} items={ collectionItems } onSelect={c => set(c.value)} />
    </Section>
  )
}

