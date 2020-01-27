import React, { FunctionComponent, useMemo } from 'react'
import { Color, Text, useInput } from 'ink'
import figures from 'figures'
import { Box } from 'ink'

type ButtonProps = {
  selected: boolean
  onHit: () => void
  label: string
  color?: string
}

export const Button: FunctionComponent<ButtonProps> = ({ selected, onHit, label, color = 'green' }) => {
  const selector = useMemo(() => selected
    ? <Color blue>{ figures.pointer } </Color>
    : <Color grey>{'> '}</Color>,
    [selected]
  )

  const labelColor = useMemo(() => ({ [color]: selected, grey: !selected }), [selected])

  useInput((_i, key) => { if (key.return && selected) onHit() })

  return (
    <Box>
      {selector}
      <Text bold={selected}><Color {...labelColor}>{ label }</Color></Text>
    </Box>
  )
}


