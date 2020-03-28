import { useEffect } from 'react'
import { GlobalState } from "@/src/services/global-context"

const allArePresent = (arr: any[] = []) => arr.every(i => typeof i !== undefined)

export function useAsyncFetch<T> (
  fetcher: () => Promise<T> | undefined,
  done: (data: T) => void,
  errorHandler?: (error: Error) => void,
  dependencies?: Array<any>
) {
  const { state: { dispatch } } = GlobalState.useContainer()
  const defaultErrorHandler = (error: Error) => { error && dispatch({ error }) }
  const handleError = errorHandler || defaultErrorHandler

  useEffect(() => {
    if (!allArePresent(dependencies)) return

    let mounted = true
    const run = async () => {
      try {
        const data = await fetcher()
        if (mounted && data) done(data)
      } catch (error) {
        handleError(error)
      }
    }

    run()
    return () => { mounted = false }
  }, dependencies)
}
