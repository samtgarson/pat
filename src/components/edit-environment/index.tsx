import React, { FunctionComponent, useState, useMemo, useCallback, useEffect } from "react"
import { WindowFactory } from "@/src/components/util/window"
import Section from "@/src/components/util/section"
import { GlobalState } from "@/src/services/global-context"
import { getMaxWidth, KeyValueEditorFactory } from "@/src/components/util/key-value-editor"
import { hshToKeyValue } from "@/src/utils/key-value-converter"
import { KeyValue } from "@/types/postman/misc"

type EditEnvironmentProps = {
  back: () => void
}

const Editor = KeyValueEditorFactory()
const Window = WindowFactory<KeyValue>()

export const EditEnvironment: FunctionComponent<EditEnvironmentProps> = ({ back }) => {
  const { state: { environment, dispatch, collection }, config } = GlobalState.useContainer()
  const [local, setLocal] = useState(environment)
  const [cursor, setCursor] = useState(0)
  const items = useMemo(() => local && hshToKeyValue(local), [local])
  const keyWidth = useMemo(
    () => items ? getMaxWidth(items) : 0,
    [items]
  )

  useEffect(() => {
    if (!environment || !collection) return
    const key = `collections.${collection.uid}.environment`
    config.set(key, environment)
  }, [environment])

  const update = useCallback(
    ({ key, value }: KeyValue) => setLocal({ ...local, [key]: value }),
    [local]
  )

  const done = useCallback(() => {
    dispatch({ environment: local })
    back()
  }, [local])

  if (!items) return null
  return <Section title="Edit environment:">
    <Window selected={cursor} onChange={setCursor} items={items} onSelect={done}>
      { (item, selected) => <Editor update={update} key={item.key} keyWidth={keyWidth} item={item} selected={selected} /> }
    </Window>
  </Section>

}
