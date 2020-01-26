import { createContainer } from 'unstated-next'
import Conf from 'conf'
import { createRouter } from './route'
import { createState } from './state'
import { createMenuState } from './menu'

const config = new Conf()

const useGlobalState = () => {
  const route = createRouter()
  const state = createState()
  const menu  = createMenuState()

  return {
    state,
    route,
    menu,
    config
  }
}

export const GlobalState = createContainer(useGlobalState)
