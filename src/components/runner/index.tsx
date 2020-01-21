import React, { useEffect } from 'react'
import { Pages } from '@/src/constants'
import { FunctionComponent } from "react"
import { ChooseRequest } from "../choose-request"
import { Color } from 'ink'
import { Menu } from './menu'
import { Delete } from '@/src/components/runner/delete'
import { GlobalState } from '@/src/services/global-context'
import { ErrorMessage } from '@/src/components/util/error'
import CollectionFetcher from '@/src/components/collection-fetcher/index'

export const Runner: FunctionComponent = () => {
  const { state: { error }, route } = GlobalState.useContainer()
  if (error) return <ErrorMessage error={ error } />

  switch (route.path) {
    case Pages.Home:
      return <CollectionFetcher />
    case Pages.List:
      return <ChooseRequest />
    case Pages.Menu:
      return <Menu />
    case Pages.DeleteCollection:
      return <Delete />
    case Pages.Env:
      /* return <EditEnvironment /> */
      return <Color>Edit environment</Color>
    default:
      return <Color>Request</Color>
  }
}

