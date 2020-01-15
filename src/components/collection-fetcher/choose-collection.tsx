import {BaseCollectionAttributes} from "@/types/postman/collection"
import {FunctionComponent} from "react"
import Section from "@/src/components/util/section"
import React from "react"
import Select from 'ink-select-input'

type ChooseCollectionProps = {
  collections: BaseCollectionAttributes[],
  set: Function
}

export const ChooseCollection: FunctionComponent<ChooseCollectionProps> = ({ set, collections }) => {
  const collectionItems = collections.map(c => ({ value: c.uid, label: c.name }))

  return (
    <Section title="Select collection:">
      <Select items={ collectionItems } onSelect={ c => set(c.value) } />
    </Section>
  )
}

