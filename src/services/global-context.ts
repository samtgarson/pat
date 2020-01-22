import PatError from "@/src/services/pat-error"
import { useState } from "react"
import { createContainer } from 'unstated-next'
import Conf from 'conf'
import { Collection } from "@/types/postman/collection"
import { Environment } from "@/types/postman/environments"
import { Pages } from "@/src/constants"

type SetStateFn = (state: { collection?: Collection, environment?: Environment, error?: any }) => void

type RouteParams = { [id: string]: any }
type Route = { path: Pages, params?: RouteParams }
type GoOptions = { replace?: boolean }

const config = new Conf()
const DEFAULT_ROUTE_PARAMS = { quickStart: true }

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
  const [routePath, setRoutePath] = useState<Pages>(Pages.Home)
  const [routeParams, setRouteParams] = useState<RouteParams>(DEFAULT_ROUTE_PARAMS)
  const [routeHistory, setRouteHistory] = useState<Route[]>([])

  const go = (path: Pages, params?: RouteParams, options?: GoOptions) => {
    const history = [...routeHistory]
    if (options?.replace) history.pop()
    history.push({ path, params })
    setRouteHistory(history)
    setRoutePath(path)
    setRouteParams(params || {})
  }

  const back = () => {
    const history = [...routeHistory]
    const previousRoute = history.pop()
    if (!previousRoute) return
    setRouteHistory(history)
    go(previousRoute.path, previousRoute.params, { replace: true })
  }

  const route = { path: routePath, params: routeParams, go, back }

  return {
    state,
    route,
    config
  }
}

export const GlobalState = createContainer(useGlobalState)
