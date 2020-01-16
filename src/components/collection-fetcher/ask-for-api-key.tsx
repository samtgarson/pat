import { FunctionComponent, useState, useCallback } from "react"
import TextInput from 'ink-text-input'
import React from "react"
import { Color, Box } from "ink"
import Section from '@/src/components/util/section'

type AskForApiKeyProps = {
  set (key: string): void
}

export const AskForApiKey: FunctionComponent<AskForApiKeyProps> = ({ set }) => {
  const [error, setError] = useState(false)
  const [value, setValue] = useState('')

  const onSubmit = useCallback((key: string) => {
    if (key.length) return set(key)
    else setError(true)
  }, [value])

  const onChange = useCallback((key: string) => {
    setValue(key)
    setError(false)
  }, [value])

  return (
    <Section title="Enter your Postman API Key:">
      <Box><TextInput value={value} onSubmit={onSubmit} onChange={onChange} />{ error && <Color red> (required)</Color> }</Box>
    </Section>
  )
}
