import React, { useMemo } from 'react'
import { Pages } from '@/src/constants'
import { FunctionComponent } from "react"
import { ChooseRequest } from "../choose-request"
import { Delete } from '@/src/components/runner/delete'
import { GlobalState } from '@/src/services/global-context/index'
import { ErrorMessage } from '@/src/components/util/error'
import CollectionFetcher from '@/src/components/collection-fetcher/index'
import { EnvironmentFetcher } from '@/src/components/environment-fetcher/index'
import { Request } from '@/src/components/request'
import { Menu } from './menu'
import { SetAuth } from '../set-auth'

export const Runner: FunctionComponent = () => {
  const {  state: { error }, route, menu: { show } } = GlobalState.useContainer()
  if (error) return <ErrorMessage error={ error } />

  if (show) return <Menu />

  switch (route.path) {
    case Pages.ChooseCollection:
      return <CollectionFetcher />
    case Pages.ChooseEnvironment:
      return <EnvironmentFetcher />
    case Pages.Home:
      return <ChooseRequest />
    case Pages.DeleteCollection:
      return <Delete />
    case Pages.Request:
      return <Request />
    case Pages.Auth:
      return <SetAuth />
    default:
      throw new Error(`Could not match route ${route.path}`)
  }
}

