import React, { FunctionComponent, useState } from "react"
import { GlobalState } from "@/src/services/global-context"
import { ChooseEnvironment } from './choose-environment'
import { FetchEnvironment } from "@/src/components/edit-environment/fetch-evironment"
import Section from "@/src/components/util/section"
import { EnvironmentItems } from "@/src/components/edit-environment/environment-items"


export const EditEnvironment: FunctionComponent = () => {
  const [environmentID, setEnvironmentID] = useState()
  const { state: { environment } } = GlobalState.useContainer()

  if (environment) {
    return <EnvironmentItems />
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
