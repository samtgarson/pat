import React, { useCallback, useState } from 'react'
import { FunctionComponent } from 'react'
import Select, { ItemProps } from 'ink-select-input'
import { Pages } from '@/src/constants'
import { Color } from 'ink'
import { GlobalState } from '@/src/services/global-context/index'
import Section from '@/src/components/util/section'
import { EditEnvironment } from '@/src/components/edit-environment'
import { MenuItems } from '@/types/menu'

const MenuItem: FunctionComponent<ItemProps> = ({ label }) => {
  const color = { red: label === MenuItems.Delete, gray: label === MenuItems.Back }
  return <Color {...color}>{ label }</Color>
}

export const Menu: FunctionComponent = () => {
  const {
    route: { go },
    state: { collection, dispatch },
    menu
  } = GlobalState.useContainer()

  const navigate = (path: Pages) => {
    menu.toggle()
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
        return menu.toggle()
      case MenuItems.SwitchCollection:
        return navigate(Pages.ChooseCollection)
      case MenuItems.SwitchRequest:
        return navigate(Pages.Home)
      case MenuItems.SwitchEnv:
        dispatch({ environment: undefined })
        return navigate(Pages.Home)
    }
  }, [go])

  const hideEnv = useCallback(() => {
    setShowEnv(false)
    menu.toggle()
  }, [showEnv])

  if (showEnv) return <EditEnvironment back={hideEnv} />

    const items = [
      ...menu.items,
      MenuItems.Back
    ].map(v => ({ value: v, label: v }))

  return <Section title={ `${collection?.info.name}` }>
    <Select onSelect={onSelect} items={items} itemComponent={MenuItem} />
  </Section>
}
