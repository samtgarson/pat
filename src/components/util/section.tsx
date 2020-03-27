import React, { FunctionComponent, Fragment }  from 'react'
import { Color, Box } from 'ink'

type SectionProps = {
  title: string
  secondary?: boolean
}

export const SectionTitle: FunctionComponent<SectionProps> = ({ title, secondary = false }) => {
  const color = { yellow: !secondary, blue: secondary, dim: secondary }
  return (
    <Box marginTop={secondary ? 1 : 0}>
      <Color grey>{ '> ' }</Color>
      <Color {...color}>{ title }</Color>
    </Box>
  )
}

const Section: FunctionComponent<SectionProps> = ({ children, ...props }) => (
  <Fragment>
    <SectionTitle {...props} />
    { children }
  </Fragment>
)

export default Section
