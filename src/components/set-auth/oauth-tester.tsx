import { FunctionComponent, useState, useCallback } from "react"
import { passwordGrant, PasswordGrantParams } from "@/src/services/password-grant"
import Loader from "@/src/components/util/loader"
import React from "react"
import { Color } from "ink"
import figures from "figures"

enum TestState {
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Failure = 'FAILURE'
}

type OAuthTesterProps = {
  params: PasswordGrantParams
}

export const OAuthTester: FunctionComponent<OAuthTesterProps> = ({ params }) => {
  const [testState, setTestState] = useState<TestState | undefined>()
  const [testResult, setTestResult] = useState<string | undefined>()

  const test = useCallback(async () => {
    try {
      setTestState(TestState.Loading)
      const result = await passwordGrant(params)
      setTestResult(result)
      setTestState(TestState.Success)
    } catch (e) {
      setTestResult(e.isPatError ? e.message : 'Something went wrong')
      setTestState(TestState.Failure)
    }
  }, [params])

  switch (testState) {
    case TestState.Loading:
      return <Loader />
    case TestState.Success:
      return <Color green>{ figures.tick } { testResult }</Color>
    case TestState.Failure:
      return <Color red>{ figures.cross } { testResult }</Color>
    default:
      test()
      return null
  }


}
