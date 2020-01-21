import React, { FunctionComponent, useState, ReactElement, useMemo, useEffect } from "react"
import { Box, useInput } from "ink"

type Item = { [key: string]: any }

type WindowProps<T extends Item> = {
  maxHeight: number
  items: T[]
  emptyMessage?: () =>  ReactElement
  onSelect?: (item: T) => void
  children: (item: T, selected: boolean) => ReactElement
}

export const WindowFactory = <T extends Item>(): FunctionComponent<WindowProps<T>> => ({
  maxHeight,
  items,
  emptyMessage = () => '',
  onSelect,
  children
}) => {
  const [cursor, setCursor] = useState(0)

  useInput((_input, key) => {
    const len = items.length
    if (key.downArrow) setCursor((cursor + 1) % len)
    if (key.upArrow) setCursor((cursor + len - 1) % len)
    if (key.return && onSelect) onSelect(items[cursor])
  })

  useEffect(() => {
    setCursor(0)
  }, [items])

  const windowStart = useMemo(() => {
    const halfHeight = Math.floor(maxHeight / 2)
    return Math.max(0, Math.min(cursor - halfHeight, items.length - maxHeight))
  }, [cursor, items, maxHeight])

  const visibleItems = useMemo(() => {
    return items.slice(windowStart, windowStart + maxHeight)
  }, [items, windowStart])


  return <Box height={maxHeight} flexDirection='column'>
    { visibleItems.map((item, i) => children(item, i + windowStart === cursor)) }
    { visibleItems.length === 0 && emptyMessage() }
  </Box>
}
