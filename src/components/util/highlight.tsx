import { FunctionComponent, ReactElement } from "react"
import { Text, Color, ColorProps } from "ink"
import React, { Children } from "react"

type HighlightProps = {
  text: string
  matches: [number, number][]
  children: (text: string) => ReactElement
}

type HighlightTextProps = {
  text: string
  match: RegExp
  color: keyof ColorProps
  baseColor?: keyof ColorProps
}

export const stringToMatches = (text: string, match: RegExp): [number, number][] => (
  Array.from(text.matchAll(match)).map(a => {
    const { index = 0 } = a
    return [index, index + a[0].length]
  })
)

export const HighlightText: FunctionComponent<HighlightTextProps> = ({ text, match, color, baseColor = 'whiteBright' }) => {
  const matches = stringToMatches(text, match)
  const colorProp = { [color]: true }
  const baseColorProp = { [baseColor]: true }
  return (<Color {...baseColorProp}>
    <Highlight text={text} matches={matches}>
      {text => <Color {...colorProp}>{ text }</Color>}
    </Highlight>
  </Color>)
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
