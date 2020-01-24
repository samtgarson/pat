import React, { useCallback } from 'react'
import { Pages } from '@/src/constants'
import { FunctionComponent } from "react"
import { ChooseRequest } from "../choose-request"
import { Menu } from './menu'
import { Delete } from '@/src/components/runner/delete'
import { GlobalState } from '@/src/services/global-context'
import { ErrorMessage } from '@/src/components/util/error'
import CollectionFetcher from '@/src/components/collection-fetcher/index'
import { EnvironmentFetcher } from '@/src/components/environment-fetcher/index'
import { Request } from '@/src/components/request'
import { EditEnvironment } from '@/src/components/edit-environment/index'


export const Runner: FunctionComponent = () => {
  const { state: { error }, route } = GlobalState.useContainer()
  if (error) return <ErrorMessage error={ error } />

  switch (route.path) {
    case Pages.ChooseCollection:
      return <CollectionFetcher />
    case Pages.ChooseEnvironment:
      return <EnvironmentFetcher />
    case Pages.List:
      return <ChooseRequest />
    case Pages.Menu:
      return <Menu />
    case Pages.DeleteCollection:
      return <Delete />
    case Pages.Env:
      return <EditEnvironment />
    case Pages.Request:
      return <Request />
    default:
      throw new Error(`Could not match route ${route.path}`)
  }
}

