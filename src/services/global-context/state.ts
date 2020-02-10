import { Collection } from "@/types/postman/collection"
import PatError from "@/src/models/pat-error"
import { useReducer } from "react"
import { PlainObj } from "@/types/postman/misc"
import { AuthenticationConfig } from "@/types/config"

export interface State {
  collection?: Collection
  environment?: PlainObj
  authentication?: AuthenticationConfig
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
