import PatError from "@/src/services/pat-error"
import { useState } from "react"
import { createContainer } from 'unstated-next'
import Conf from 'conf'
import {Collection} from "@/types/postman/collection"
import {Environment} from "@/types/postman/environments"
import {Pages} from "@/src/constants"

type SetStateFn = (state: { collection?: Collection, environment?: Environment, error?: any }) => void

const config = new Conf()

const useGlobalState = () => {
  const [environment, setEnvironment] = useState<Environment>()
  const [collection, setCollection] = useState<Collection>()
  const [error, setError] = useState<Error | PatError>()

  const setState: SetStateFn = state => {
    if (process.env.PAT_DEBUG) {
      Object.entries(state).forEach(([k, v]) =>
        console.log('[SETTING STATE] ', `${k}: ${JSON.stringify(v || 'undefined').substr(0, 50)}`)
      )
    }
    if ('collection' in state) setCollection(state.collection)
    if ('environment' in state) setEnvironment(state.environment)
    if ('error' in state) setError(state.error)
  }

  const state = { environment, collection, error, setState }
  const [route, go] = useState<Pages>(Pages.Home)

  return {
    state,
    route,
    go,
    config
  }
}

export const GlobalState = createContainer(useGlobalState)
