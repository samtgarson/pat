import { useState } from "react"
import { useInput } from "ink"

export const useCursor = (len: number) => {
  const [cursor, setCursor] = useState(0)
  const [length, setLength] = useState(len)

  useInput((input, key) => {
    if (key.downArrow) return setCursor((cursor + 1) % length)
    if (key.upArrow) return setCursor((cursor + len - 1) % length)
    if (input === '\t') {
      if (key.shift) return setCursor((cursor + len - 1) % length)
      return setCursor((cursor + 1) % length)
    }
  })

  return { cursor, setCursor, setLength }
}
