import React, { FunctionComponent, useMemo } from 'react'
import { Color, Text, useInput } from 'ink'
import figures from 'figures'
import { Box } from 'ink'

type ButtonProps = {
  selected: boolean
  onHit: () => void
  label: string
  color?: string
	marginLeft?: number
	marginRight?: number
}

export const Button: FunctionComponent<ButtonProps> = ({ selected, onHit, label, color = 'green', ...boxProps }) => {
  const selectorColor = useMemo(() => ({ blue: selected, grey: !selected, dim: !selected }), [selected])
  const labelColor = useMemo(() => ({ [color]: selected, grey: !selected }), [selected])

  useInput((_i, key) => { if (key.return && selected) onHit() })

  return (
    <Box {...boxProps}>
      <Color {...selectorColor}>{ figures.pointer } </Color>
      <Text bold={selected}><Color {...labelColor}>{ label }</Color></Text>
    </Box>
  )
}


