import Section from "@/src/components/util/section"
import React, { FunctionComponent, useState } from "react"
import { BaseWorkspaceAttributes } from "@/types/postman/workspace"
import Select from 'ink-select-input'
import PostmanClient from "@/src/services/postman-client"
import {FetchWorkspace} from "@/src/components/collection-fetcher/fetch-workspace"

type ChooseWorkspaceProps = {
  workspaces: BaseWorkspaceAttributes[]
  client: PostmanClient
  set: Function
}

export const ChooseWorkspace: FunctionComponent<ChooseWorkspaceProps> = ({ set, workspaces, client }) => {
  const workspaceItems = workspaces.map(w => ({ value: w.id, label: w.name }))
  const [workspaceID, setWorkspaceID] = useState()

  if (workspaceID) return (
    <FetchWorkspace client={client} setWorkspace={set} id={workspaceID} />
  )

  return (
    <Section title="Select workspace:">
      <Select items={ workspaceItems } onSelect={ w => setWorkspaceID(w.value) }/>
    </Section>
  )
}



