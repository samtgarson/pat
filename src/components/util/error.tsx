import React, { FunctionComponent } from 'react'
import { Text, Color } from 'ink'
import PatError from '@/src/services/pat-error'

type ErrorMessageProps = {
  error: Error | PatError
}

const defaultErrorMessage = 'Something went wrong'

export const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({ error }) => {
  const message = PatError.isPatError(error) ? error.message : defaultErrorMessage

  return <Text>
    <Color grey>{ '>' }</Color> <Color red>{ message }</Color>
  </Text>
}

