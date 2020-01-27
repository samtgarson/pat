import { KeyValue } from '@/types/postman/misc'
import { FunctionComponent } from 'react'
import { KeyValueEditorFactory, getMaxWidth } from '@/src/components/util/key-value-editor'
import Section from '@/src/components/util/section'
import React from 'react'

type EditorProps = {
  items: KeyValue[]
  cursor: number
  title: string
  update: (item: KeyValue) => void
}

const ItemEditor = KeyValueEditorFactory()

export const Editor: FunctionComponent<EditorProps> = ({ items, cursor, update, title }) => {
  const width = getMaxWidth(items)
  return (
    <Section secondary title={title}>
      { items.map((q, i) =>
        <ItemEditor key={q.key} item={q} update={update} keyWidth={width} selected={i === cursor} />
      )}
    </Section>
  )
}
