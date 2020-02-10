import React, { FunctionComponent, useState, useCallback } from 'react'
import Select, { Item } from 'ink-select-input'
import { AuthTypes, Pages } from '@/src/constants'
import Section from '@/src/components/util/section'
import { OAuth2 } from '@/src/components/set-auth/oauth2'
import { GlobalState } from '@/src/services/global-context'
import { PlainObj } from '@/types/postman/misc'
import { CompleteAuth } from '@/src/components/set-auth/complete'

const items: Item[] = Object.entries(AuthTypes).map(([value, label]) => ({ value, label }))

export const SetAuth: FunctionComponent = () => {
  const { state: { collection, dispatch, authentication }, route } = GlobalState.useContainer()
  if (!collection) route.go(Pages.Home)

  const [type, setType] = useState<AuthTypes | undefined>()
  const [authConfig, setConfig] = useState<PlainObj | undefined>()

  const saveConfig = useCallback((c: Partial<PlainObj>) => {
    const filteredConfig = Object.entries(c).reduce<PlainObj>((hsh, [k, v]) => {
      if (v) hsh[k] = v
      return hsh
    }, {})
    setConfig(filteredConfig)
  }, [])

  const saveType = useCallback((t: AuthTypes) => {
    if (t !== authentication?.type) dispatch({ authentication: undefined })
    setType(t)
  }, [])

  if (authConfig && type) return <CompleteAuth config={authConfig} type={type} />

  switch (type) {
    case AuthTypes.Basic:
      return null
    case AuthTypes.OAuth2:
      return <OAuth2 done={saveConfig} />
    default:
      return <Section title="Choose auth type:">
        <Select onSelect={({ label }) => saveType(label as AuthTypes)} items={items} />
      </Section>
  }
}
