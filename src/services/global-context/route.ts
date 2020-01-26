import { Pages } from "@/src/constants"
import { useState } from "react"

export type RouteParams = { [id: string]: any }
export type Route = { path: Pages, params: RouteParams }
export type GoOptions = { replace?: boolean }
export type Go = (path: Pages, params?: RouteParams, options?: GoOptions) => void

const DEFAULT_ROUTE_PARAMS = { quickStart: true }

export const createRouter = () => {
  const [routeObj, setRouteObj] = useState<Route>({ path: Pages.ChooseCollection, params: DEFAULT_ROUTE_PARAMS  })
  const [routeHistory, setRouteHistory] = useState<Route[]>([{ path: Pages.ChooseCollection, params: {} }])

  const go: Go = (path, params = {}, options = {}) => {
    if (path === routeObj.path && params == routeObj.params) return

    if (process.env.PAT_DEBUG) {
      console.log(`NAVIGATING FROM ROUTE: ${JSON.stringify(routeObj)}`)
      console.log(`NAVIGATING TO ROUTE: ${path} ${JSON.stringify(params)}`)
    }

    const history = [...routeHistory]
    const newRoute = { path, params }

    if (options.replace) history.pop()
    history.push(newRoute)
    setRouteHistory(history)
    setRouteObj(newRoute)
  }

  const back = () => {
    const history = [...routeHistory]
    const [previousRoute, currentRoute] = history.splice(-2, 2)
    if (!previousRoute || !currentRoute) return
    setRouteHistory(history)
    go(previousRoute.path, previousRoute.params)
  }

  return { ...routeObj, go, back }
}
