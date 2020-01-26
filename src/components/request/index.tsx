import React, { FunctionComponent } from "react"
import { GlobalState } from "@/src/services/global-context"
import { Node } from "@/src/models/node"
import Section from "@/src/components/util/section"
import { useMenu } from "@/src/services/menu"
import { Summary } from "@/src/components/request/summary"
import { MenuItems } from "@/types/menu"

export const Request: FunctionComponent = () => {
  const { route: { params } } = GlobalState.useContainer()
  useMenu([MenuItems.SwitchRequest, MenuItems.Env, MenuItems.SwitchEnv])

  const node: Node = params.node
  const { request } = node
  if (!node || !request) return null

  return <Section title={ node.name }>
    <Summary request={request} />
  </Section>
}
