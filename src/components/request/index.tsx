import React, { FunctionComponent } from "react"
import { GlobalState } from "@/src/services/global-context"
import { Node } from "@/src/models/node"
import { useInput } from 'ink'
import Section from "@/src/components/util/section"
import { Pages } from "@/src/constants"

export const Request: FunctionComponent = () => {
  const { route: { params, go } } = GlobalState.useContainer()

  useInput(input => {
    if (input === '?') go(Pages.Menu)
  })

  const node: Node = params.node
  if (!node) return null

  const { request } = node

  return <Section title={ node.name }>
  </Section>
}
