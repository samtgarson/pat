import { createContainer } from 'unstated-next'
import Conf from 'conf'
import { createState } from '@/src/services/global-context/state'
import { createRouter } from '@/src/services/global-context/route'

const config = new Conf()

const useGlobalState = () => {
  const state = createState()
  const route = createRouter()

  return {
    state,
    route,
    config
  }
}

export const GlobalState = createContainer(useGlobalState)
