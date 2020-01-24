import { createContainer } from 'unstated-next'
import Conf from 'conf'
import { createRouter } from './route'
import { createState } from './state'

const config = new Conf()
const useGlobalState = () => {
  const route = createRouter()
  const state  = createState()

  return {
    state,
    route,
    config
  }
}

export const GlobalState = createContainer(useGlobalState)
