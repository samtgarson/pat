import { Pages } from "@/src/constants"
import { useState } from "react"

export type RouteParams = { [id: string]: any }
export type Route = { path: Pages, params?: RouteParams }
export type GoOptions = { replace?: boolean }
export type Go = (path: Pages, params?: RouteParams, options?: GoOptions) => void

const DEFAULT_ROUTE_PARAMS = { quickStart: true }

export const createRouter = () => {
  const [routePath, setRoutePath] = useState<Pages>(Pages.ChooseCollection)
  const [routeParams, setRouteParams] = useState<RouteParams>(DEFAULT_ROUTE_PARAMS)
  const [routeHistory, setRouteHistory] = useState<Route[]>([{ path: Pages.ChooseCollection }])

  const go: Go = (path, params, options) => {
    if (path === routePath && params == routeParams) return

    if (process.env.PAT_DEBUG) {
      console.log(`NAVIGATING FROM ROUTE: ${routePath} ${JSON.stringify(routeParams)}`)
      console.log(`NAVIGATING TO ROUTE: ${path} ${JSON.stringify(params)}`)
    }

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
