import React, { FunctionComponent, Fragment } from 'react'
import { AppOptions } from '@/types/options'
import { GlobalState } from '@/src/services/global-context/index'
import { Runner } from '@/src/components/runner'
import ErrorBoundary, { FallbackProps } from 'react-error-boundary'
import { ErrorMessage } from '@/src/components/util/error'
import { Text } from 'ink'

const debug = !!process.env.PAT_DEBUG

const ErrorHandler: FunctionComponent<FallbackProps> = ({ componentStack, error }) => (
  <Fragment>
    <ErrorMessage error={error} raw={debug} />
    { debug && <Text>{ componentStack }</Text> }
  </Fragment>
)

const App: FunctionComponent<AppOptions> = () => {
  return <ErrorBoundary FallbackComponent={ErrorHandler}>
    <GlobalState.Provider>
      <Runner />
    </GlobalState.Provider>
  </ErrorBoundary>
}

export default App

