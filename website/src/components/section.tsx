import React, { FunctionComponent, CSSProperties } from 'react'

type SectionProps = {
  centered?: boolean
  box?: boolean
  style?: CSSProperties
}

export const Section: FunctionComponent<SectionProps> = ({
  children,
  centered = false,
  box = false,
  style = {}
}) => {
  const classes = []
  if (box) classes.push('box')
  return (
    <section
      className={classes.join(' ')}
      style={{
        margin: `50px 0`,
        textAlign: centered ? 'center' : 'left',
        ...style
      }}
    >
      { children }
    </section>
  )
}
