import { FunctionComponent } from "react"
import { Text } from "ink"
import React, { Children } from "react"

type HighlightProps = {
  text: string
  matches: [number, number][],
  children: (text: string) => any
}

export const Highlight: FunctionComponent<HighlightProps> = ({ text, matches, children = text => text }) => {
  const substrings = []
  let previousEnd = 0

  for (let [start, end] of matches) {
    const prefix = text.substring(previousEnd, start)
    const match = children(text.substring(start, end))

    substrings.push(prefix, match)
    previousEnd = end
  }

  substrings.push(text.substring(previousEnd))

  return <Text>{Children.toArray(substrings)}</Text>
}
