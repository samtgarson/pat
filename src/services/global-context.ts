import PatError from "@/src/services/pat-error"
import { createContext, useContext } from "react"
import Conf from 'conf'

export type StoredCollection = {
  apiKey: string,
  name: string,
  uid: string
}

type GlobalContextState = {
  error?: Error | PatError
  setError (e: Error | PatError):  void
  config: Conf
}

export const config = new Conf({ defaults: { collections: {} } })

export const GlobalContext = createContext<GlobalContextState>({
  setError () {},
  config
})

export const useGlobal = () => useContext(GlobalContext)


