import React, { FunctionComponent, useState, useMemo } from "react"
import { GlobalState } from "@/src/services/global-context"
import Select from 'ink-select-input'
import { FetchEnvironments } from "@/src/components/environment-fetcher/fetch-environments"
import PostmanClient from "@/src/services/postman-client"
import { Environment } from "@/types/postman/environments"

type ChooseEnvironmentProps = {
  done: (envID: string) => void
}

export const ChooseEnvironment: FunctionComponent<ChooseEnvironmentProps> = ({ done }) => {
  const { state: { apiKey } } = GlobalState.useContainer()
  const [envs, setEnvs] = useState<Environment[]>()

  const items = useMemo(() => envs && envs.map(e => ({ value: e.uid, label: e.name  })), [envs])
  const client = useMemo(() => apiKey && new PostmanClient(apiKey), [apiKey])

  if (!client) return null
  if (!envs) return <FetchEnvironments set={setEnvs} client={client} />
  return <Select items={items} onSelect={i => done(`${i.value}`)} />
}

