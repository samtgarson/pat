import React, { FunctionComponent } from 'react'
import { Text, Color } from 'ink'
import PatError from '@/src/models/pat-error'

type ErrorMessageProps = {
  error: Error | PatError
}

const defaultErrorMessage = 'Something went wrong'

export const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({ error }) => {
  if (process.env.PAT_DEBUG) console.error(error)
  const message = PatError.isPatError(error) ? error.message : defaultErrorMessage

  return <Text>
    <Color grey>{ '>' }</Color> <Color red>{ message }</Color>
  </Text>
}

