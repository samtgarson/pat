import React, { FunctionComponent } from "react"
import { GlobalState } from "@/src/services/global-context"
import { StoredEnvironment } from "@/types/config"
import Select, { Item } from 'ink-select-input'

type ChooseEnvironmentProps = {
  done: (envID: string) => void
}

export const ChooseEnvironment: FunctionComponent<ChooseEnvironmentProps> = ({ done }) => {
  const { config, state: { workspaceID } } = GlobalState.useContainer()

  let envs: StoredEnvironment[] = Object.values(config.get('environments'))
  if(workspaceID) envs = envs.filter(e => e.workspaceID === workspaceID)


  const items: Item[] = envs.map(e => ({ value: e.uid, label: e.name  }))

  return <Select items={items} onSelect={i => done(`${i.value}`)} />
}

