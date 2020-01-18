import React from 'react'
import { Collection } from "@/types/postman/collection"
import { CollectionPages } from '@/src/constants'
import { FunctionComponent, useState } from "react"
import { ChooseRequest } from "../choose-request"
import { Color, Text } from 'ink'
import { Menu } from './menu'
import {Delete} from '@/src/components/runner/delete'

type RunnerProps = {
  collection: Collection
  back: () => void
}

export const Runner:FunctionComponent<RunnerProps> = ({ collection, back }) => {
  const [route, go] = useState(CollectionPages.List)

  switch (route) {
    case CollectionPages.List:
      return <ChooseRequest go={go} collection={collection} />
    case CollectionPages.Menu:
      return <Menu go={go} />
    case CollectionPages.Home:
      back()
      return null
    case CollectionPages.DeleteCollection:
      return <Delete go={go} collection={collection} />
    default:
      return <Color>Request</Color>
  }
}

