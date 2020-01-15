import Section from "@/src/components/util/section"
import React, { FunctionComponent } from "react"
import { BaseWorkspaceAttributes } from "@/types/postman/workspace"
import Select from 'ink-select-input'

type ChooseWorkspaceProps = {
  workspaces: BaseWorkspaceAttributes[],
  set: Function
}

export const ChooseWorkspace: FunctionComponent<ChooseWorkspaceProps> = ({ set, workspaces }) => {
  const workspaceItems = workspaces.map(w => ({ value: w.id, label: w.name }))

  return (
    <Section title="Select workspace:">
      <Select items={ workspaceItems } onSelect={ w => set(w.value) }/>
    </Section>
  )
}



