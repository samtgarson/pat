import { Collection } from "@/types/postman/collection"
import { Environment } from "@/types/postman/environments"
import PatError from "@/src/services/pat-error"
import { useReducer } from "react"

interface State {
  collection?: Collection
  environment?: Environment
  error?: Error | PatError
  apiKey?: string
  workspaceID?: string
}

const reducer = (state: State, action: State) => {
  if (process.env.PAT_DEBUG) {
    Object.entries(action).forEach(([k, v]) => {
      const val = typeof v === undefined ? 'undefined' : v
      console.log('[SETTING STATE] ', `${k}: ${JSON.stringify(val).substr(0, 50)}`)
    })
  }
  return { ...state, ...action }
}

export const createState = () => {
  const [state, dispatch] = useReducer(reducer, {})
  return  { ...state, dispatch }
}
