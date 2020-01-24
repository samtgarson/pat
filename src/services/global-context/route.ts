import { Pages } from "@/src/constants"
import { useState } from "react"

type RouteParams = { [id: string]: any }
type Route = { path: Pages, params?: RouteParams }
type GoOptions = { replace?: boolean }

const DEFAULT_ROUTE_PARAMS = { quickStart: true }

export const createRouter = () => {
  const [routePath, setRoutePath] = useState<Pages>(Pages.Home)
  const [routeParams, setRouteParams] = useState<RouteParams>(DEFAULT_ROUTE_PARAMS)
  const [routeHistory, setRouteHistory] = useState<Route[]>([{ path: Pages.Home }])

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
    const [previousRoute, currentRoute] = history.splice(-2, 2)
    if (!previousRoute || !currentRoute) return
    setRouteHistory(history)
    go(previousRoute.path, previousRoute.params)
  }

  return { path: routePath, params: routeParams, go, back }
}
