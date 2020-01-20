import React, { FunctionComponent } from 'react'
import { AppOptions } from '@/types/options'
import { GlobalState } from '@/src/services/global-context'
import { Runner } from '@/src/components/runner'

const App: FunctionComponent<AppOptions> = () => {
  return <GlobalState.Provider>
    <Runner />
  </GlobalState.Provider>
}

export default App

