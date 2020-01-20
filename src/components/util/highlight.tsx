import { FunctionComponent, ReactElement } from "react"
import { Text } from "ink"
import React, { Children } from "react"

type HighlightProps = {
  text: string
  matches: [number, number][]
  children: (text: string) => ReactElement
}

export const Highlight: FunctionComponent<HighlightProps> = ({ text, matches, children = str => str }) => {
  const substrings = []
  let previousEnd = 0

  for (const [start, end] of matches) {
    const prefix = text.substring(previousEnd, start)
    const match = children(text.substring(start, end))

    substrings.push(prefix, match)
    previousEnd = end
  }

  substrings.push(text.substring(previousEnd))

  return <Text>{Children.toArray(substrings)}</Text>
}
