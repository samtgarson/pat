/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent, useState, useMemo, useCallback, Fragment } from "react"
import { KeyValue, PlainObj } from "@/types/postman/misc"
import { useCursor } from "@/src/services/use-cursor"
import { Form } from "@/src/components/util/form"
import { hshToKeyValue } from "@/src/utils/key-value-converter"
import { Button } from "@/src/components/util/button"
import { PasswordGrantParams } from "@/src/services/password-grant"
import { Box } from "ink"
import { GlobalState } from "@/src/services/global-context"
import { OAuthTester } from "@/src/components/set-auth/oauth-tester"

const fields: PasswordGrantParams = {
  client_id:     undefined,
  client_secret: undefined,
  username:      '',
  password:      '',
  url:           ''
}

type OAuth2Props = {
  done: (config: Partial<PlainObj>) => void
}

export const OAuth2: FunctionComponent<OAuth2Props> = ({ done }) => {
  const { state: { authentication }, route: { back } } = GlobalState.useContainer()
  const [params, setParams] = useState({ ...fields, ...authentication?.config })
  const [runTest, setRunTest] = useState(false)
  const keyValue = useMemo(() => hshToKeyValue(params), [params])
  const { cursor } = useCursor(keyValue.length + 3)

  const update = useCallback(
    ({ key, value }: KeyValue) => {
      setParams({ ...params, [key]: value })
      setRunTest(false)
    },
    [params]
  )

  return <Fragment>
    <Form primary={true} title='OAuth2 config:' cursor={cursor} items={keyValue} update={update} secretKeys={['password', 'client_secret']} />
    <Box marginTop={1}>
      <Button marginRight={1} selected={cursor === keyValue.length} onHit={() => setRunTest(true)} color='blue' label='Test' />
      { runTest && <OAuthTester params={params} /> }
    </Box>
    <Button selected={cursor === keyValue.length + 1} onHit={() => done(params)} label='Save' />
    <Button selected={cursor === keyValue.length + 2} onHit={back} label='Back' />
  </Fragment>
}
