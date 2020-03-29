import { FunctionComponent, useState } from "react"
import { passwordGrant, PasswordGrantParams } from "@/src/services/password-grant"
import { Loader } from "@/src/components/util/loader"
import React from "react"
import { Color } from "ink"
import figures from "figures"
import { useAsyncFetch } from "@/src/utils/use-async"
import PatError from "@/src/models/pat-error"

enum TestState {
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Failure = 'FAILURE'
}

type OAuthTesterProps = {
  params: PasswordGrantParams
}

export const OAuthTester: FunctionComponent<OAuthTesterProps> = ({ params }) => {
  const [testState, setTestState] = useState<TestState | undefined>(TestState.Loading)
  const [testResult, setTestResult] = useState<string | undefined>()

  useAsyncFetch(
    () => passwordGrant(params),
    result => {
      setTestResult(result)
      setTestState(TestState.Success)
    },
    e => {
      setTestResult(PatError.isPatError(e) ? e.message : 'Something went wrong')
      setTestState(TestState.Failure)
    },
    [params]
  )

  switch (testState) {
    case TestState.Loading:
      return <Loader />
    case TestState.Success:
      return <Color green>{ figures.tick } { testResult }</Color>
    case TestState.Failure:
      return <Color red>{ figures.cross } { testResult }</Color>
    default:
      return null
  }


}
