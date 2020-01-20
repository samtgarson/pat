import { BaseCollectionAttributes, Collection } from "@/types/postman/collection"
import { FunctionComponent, useState } from "react"
import Section from "@/src/components/util/section"
import React from "react"
import Select, { ItemProps } from 'ink-select-input'
import { NEW_COLLECTION } from '@/src/constants'
import { Color } from "ink"
import PostmanClient from "@/src/services/postman-client"
import { FetchCollection } from "@/src/components/collection-fetcher/fetch-collection"

type ChooseCollectionProps = {
  collections: BaseCollectionAttributes[]
  set: (collection: Collection) => void
  getApiKey: (id: string) => string
  allowNew?: boolean
  chooseNew?: Function
}

const NEW_COLLECTION_LABEL = 'Add new collection'

const Item: FunctionComponent<ItemProps> = ({ label, isSelected }) => (
	<Color blue={isSelected} gray={label === NEW_COLLECTION_LABEL}>
		{label}
	</Color>
)

export const ChooseCollection: FunctionComponent<ChooseCollectionProps> = ({ set, collections, getApiKey, chooseNew, allowNew = false }) => {
  const collectionItems = collections.map(c => ({ value: c.uid, label: c.name }))
  const [collectionID, setCollectionID] = useState()

  if (allowNew) collectionItems.push({ value: NEW_COLLECTION, label: NEW_COLLECTION_LABEL })

  if (collectionID) {
    if (collectionID === NEW_COLLECTION && chooseNew) {
      chooseNew()
      return null
    }

    const apiKey = getApiKey(collectionID)
    const client = new PostmanClient(apiKey)
    return <FetchCollection client={client} set={set} id={collectionID} />
  }

  return (
    <Section title="Select collection:">
      <Select itemComponent={Item} items={collectionItems} onSelect={c => setCollectionID(c.value)} />
    </Section>
  )
}

