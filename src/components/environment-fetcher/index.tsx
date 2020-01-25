import React, { FunctionComponent, useState } from "react"
import { GlobalState } from "@/src/services/global-context"
import { ChooseEnvironment } from './choose-environment'
import { FetchEnvironment } from "./fetch-evironment"
import Section from "@/src/components/util/section"
import { Pages } from "@/src/constants"


export const EnvironmentFetcher: FunctionComponent = () => {
  const [environmentID, setEnvironmentID] = useState()
  const {
    config,
    state: { environment, collection },
    route: { go }
  } = GlobalState.useContainer()

  if (environment) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const key = `collections.${collection!.uid}.environment`
    config.set(key, environment)
    go(Pages.Home)
  }

  if (environmentID) {
    return <FetchEnvironment id={environmentID} />
  }

  return (
    <Section title="Choose Environment:">
      <ChooseEnvironment done={setEnvironmentID} />
    </Section>
  )
}
