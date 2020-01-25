import React, { FunctionComponent } from "react"
import { GlobalState } from "@/src/services/global-context"
import { Node } from "@/src/models/node"
import Section from "@/src/components/util/section"
import { useMenu } from "@/src/services/menu"

export const Request: FunctionComponent = () => {
  const { route: { params } } = GlobalState.useContainer()

  const node: Node = params.node
  if (!node) return null

  const { request } = node
  const { showMenu, Menu } = useMenu()

  if (showMenu) return <Menu />
  return <Section title={ node.name }>
  </Section>
}
