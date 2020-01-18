import React, { useCallback } from 'react'
import { FunctionComponent } from 'react'
import Select, { ItemProps } from 'ink-select-input'
import { CollectionPages } from '@/src/constants'
import {Color} from 'ink'

type MenuProps = {
  go: (route: CollectionPages) => void
}

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

export const Menu:FunctionComponent<MenuProps> = ({ go }) => {
  const onSelect = useCallback(({ value }) => {
    switch (value) {
      case MenuItems.Env:
        return go(CollectionPages.Env)
      case MenuItems.Delete:
        return go(CollectionPages.DeleteCollection)
      case MenuItems.Back:
        return go(CollectionPages.List)
      case MenuItems.Switch:
        return go(CollectionPages.Home)
    }
  }, [go])

  const items = Object.values(MenuItems).map(v => ({ value: v, label: v }))
  return <Select onSelect={onSelect} items={items} itemComponent={MenuItem} />
}
