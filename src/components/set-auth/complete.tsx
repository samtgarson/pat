import { PlainObj } from "@/types/postman/misc"
import { Pages, AuthTransportTypes, AuthTypes } from "@/src/constants"
import React, { FunctionComponent, useState, useMemo } from "react"
import { GlobalState } from "@/src/services/global-context"
import Section from "@/src/components/util/section"
import InkSelectInput from "ink-select-input"
import { AuthenticationConfig, BasicAuthConfig, OAuth2Config } from "@/types/config"
import { PasswordGrantParams } from "@/src/services/password-grant"

type CompleteAuthProps = {
  config: PlainObj | PasswordGrantParams
  type: AuthTypes
}

const buildAuthConfig = (type: AuthTypes, config: AuthenticationConfig['config'], transport: AuthTransportTypes) => {
  switch (type) {
    case AuthTypes.Basic:
      return { type, config, transport } as BasicAuthConfig
    case AuthTypes.OAuth2:
      return { type, config, transport } as OAuth2Config
  }
}

export const CompleteAuth: FunctionComponent<CompleteAuthProps> = ({ config: authConfig, type }) => {
  const { config, state: { collection, dispatch }, route: { go } } = GlobalState.useContainer()
  const [transport, setTransport] = useState<AuthTransportTypes | undefined>()

  const items = useMemo(() => Object.entries(AuthTransportTypes)
    .map(([value, label]) => ({ value, label })),
    [])

  if (!collection) return null

  if (transport) {
    const key = `collections.${collection.uid}.authentication`
    const authentication = buildAuthConfig(type, authConfig, transport)
    config.set(key, authentication)
    dispatch({ authentication })
    go(Pages.Home)
    return null
  }

  return (
    <Section title='Send authorization as:'>
      <InkSelectInput items={items} onSelect={({ label }) => setTransport(label as AuthTransportTypes)} />
    </Section>
  )
}
