import { KeyValue } from '@/types/postman/misc'
import { FunctionComponent, useMemo } from 'react'
import { KeyValueEditorFactory, getMaxWidth } from '@/src/components/util/key-value-editor'
import Section from '@/src/components/util/section'
import React from 'react'

type FormProps = {
  items: KeyValue[]
  cursor: number
  title: string
  update: (item: KeyValue) => void
  primary?: boolean
  secretKeys?: string[]
}

const ItemEditor = KeyValueEditorFactory()

export const Form: FunctionComponent<FormProps> = ({ items, cursor, update, title, primary = false, secretKeys = [] }) => {
  const width = useMemo(() => getMaxWidth(items), [items])
  return (
    <Section secondary={!primary} title={title}>
      { items.map((q, i) => <ItemEditor
          secret={secretKeys.includes(q.key)}
          key={q.key}
          item={q}
          update={update}
          keyWidth={width}
          selected={i === cursor}
        />
      )}
    </Section>
  )
}
