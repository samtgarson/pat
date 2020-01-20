import React, { useCallback } from 'react'
import { FunctionComponent } from 'react'
import Select, { ItemProps } from 'ink-select-input'
import { Pages } from '@/src/constants'
import { Color } from 'ink'
import { GlobalState } from '@/src/services/global-context'
import Section from '@/src/components/util/section'

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

export const Menu: FunctionComponent = () => {
  const { go, state: { collection } } = GlobalState.useContainer()

  const onSelect = useCallback(({ value }) => {
    switch (value) {
      case MenuItems.Env:
        return go(Pages.Env)
      case MenuItems.Delete:
        return go(Pages.DeleteCollection)
      case MenuItems.Back:
        return go(Pages.List)
      case MenuItems.Switch:
        return go(Pages.Home)
    }
  }, [go])

  const items = Object.values(MenuItems).map(v => ({ value: v, label: v }))
  return <Section title={ `${collection?.info.name}` }>
    <Select onSelect={onSelect} items={items} itemComponent={MenuItem} />
  </Section>
}
