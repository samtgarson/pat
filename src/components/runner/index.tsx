import React from 'react'
import { Collection } from "@/types/postman/collection"
import { FunctionComponent, Fragment, useState } from "react"
import { ChooseRequest } from "../choose-request"
import TextInput from 'ink-text-input'
import {Box, Color} from 'ink'

type RunnerProps = {
  collection: Collection
}

export const Runner:FunctionComponent<RunnerProps> = ({ collection }) => {
  const [filter, setFilter] = useState('')

  return <Fragment>
    <ChooseRequest collection={collection} filter={filter} />
    <Box marginTop={1}>
      <Color gray>{'> '}</Color>
      <Color gray={ filter.length === 0 }>
        <TextInput value={filter} onChange={setFilter} placeholder="Search (? for help)" />
      </Color>
    </Box>
  </Fragment>
}

