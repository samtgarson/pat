import { useState } from "react"
import { useInput } from "ink"

export const useCursor = (len: number) => {
  const [cursor, setCursor] = useState(0)

  useInput((_input, key) => {
    if (key.downArrow) return setCursor((cursor + 1) % len)
    if (key.upArrow) return setCursor((cursor + len - 1) % len)
  })

  return { cursor }
}
