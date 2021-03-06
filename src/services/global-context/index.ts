import { createContainer } from 'unstated-next'
import { createRouter } from './route'
import { createState } from './state'
import { createMenuState } from './menu'
import useForceUpdate from 'use-force-update'
import { config } from '@/src/utils/config'

const clear = () => {
  const fill = Array(process.stdout.rows).fill('\n').join('')
  process.stdout.write(fill)
}

const useGlobalState = () => {
  const route = createRouter()
  const state = createState()
  const menu  = createMenuState()
  const forceUpdate = useForceUpdate()

  const rerender = (doClear = true) => {
    if (doClear) clear()
    forceUpdate()
  }

  return {
    state,
    route,
    menu,
    config,
    rerender,
    clear
  }
}

export const GlobalState = createContainer(useGlobalState)
