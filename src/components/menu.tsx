import React, { useCallback, useState } from 'react'
import { FunctionComponent } from 'react'
import Select, { ItemProps } from 'ink-select-input'
import { Pages } from '@/src/constants'
import { Color } from 'ink'
import { GlobalState } from '@/src/services/global-context'
import Section from '@/src/components/util/section'
import { EditEnvironment } from '@/src/components/edit-environment'

enum MenuItems {
  Switch = 'Use another collection',
  Env    = 'Edit environment',
  Delete = 'Delete this collection',
  Back   = 'Back'
}

const MenuItem: FunctionComponent<ItemProps> = ({ label }) => {
  const color = { red: label === MenuItems.Delete, gray: label === MenuItems.Back }
  return <Color {...color}>{ label }</Color>
}

export const MenuFactory: (hideMenu: () => void) => FunctionComponent = hideMenu => () => {
  const { route: { go }, state: { collection } } = GlobalState.useContainer()

  const navigate = (path: Pages) => {
    hideMenu()
    go(path)
  }

  const [showEnv, setShowEnv] = useState(false)
  const onSelect = useCallback(({ value }) => {
    switch (value) {
      case MenuItems.Env:
        return setShowEnv(true)
      case MenuItems.Delete:
        return navigate(Pages.DeleteCollection)
      case MenuItems.Back:
        return hideMenu()
      case MenuItems.Switch:
        return navigate(Pages.ChooseCollection)
    }
  }, [go])

  const hideEnv = useCallback(() => {
    setShowEnv(false)
    hideMenu()
  }, [showEnv])

  if (showEnv) return <EditEnvironment back={hideEnv} />

  const items = Object.values(MenuItems).map(v => ({ value: v, label: v }))
  return <Section title={ `${collection?.info.name}` }>
    <Select onSelect={onSelect} items={items} itemComponent={MenuItem} />
  </Section>
}
