import React, { FunctionComponent, createContext } from 'react'
import { Text, Color } from 'ink'
import PatError from '@/src/services/pat-error'

type ErrorMessageProps = {
  error: Error | PatError
}

type ErrorContextState = {
  error?: Error | PatError
  setError (e: Error | PatError):  void
}

const defaultErrorMessage = 'Something went wrong'

export const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({ error }) => (
  <Text>
    <Color grey>{ '>' }</Color> <Color red>{ PatError.isPatError(error) ? error.message : defaultErrorMessage }</Color>
  </Text>
)

export const ErrorContext = createContext<ErrorContextState>({
  setError () {}
})

