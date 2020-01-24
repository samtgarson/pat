import React, { FunctionComponent, ReactElement, useMemo, useEffect } from "react"
import { Box, useInput } from "ink"

type Item = { [key: string]: any }

type WindowProps<T extends Item> = {
  maxHeight?: number
  items: T[]
  emptyMessage?: () =>  ReactElement
  onSelect?: (item: T) => void
  children: (item: T, selected: boolean) => ReactElement
  selected: number
  onChange: (selected: number) => void
}

export const WindowFactory = <T extends Item>(): FunctionComponent<WindowProps<T>> => ({
  maxHeight = 10,
  items,
  emptyMessage = () => '',
  onSelect,
  children,
  selected,
  onChange
}) => {
  useInput((_input, key) => {
    const len = items.length
    if (key.downArrow) onChange((selected + 1) % len)
    if (key.upArrow) onChange((selected + len - 1) % len)
    if (key.return && onSelect) onSelect(items[selected])
  })

  const windowStart = useMemo(() => {
    const halfHeight = Math.floor(maxHeight / 2)
    return Math.max(0, Math.min(selected - halfHeight, items.length - maxHeight))
  }, [selected, items, maxHeight])

  const visibleItems = useMemo(() => {
    return items.slice(windowStart, windowStart + maxHeight)
  }, [items, windowStart])


  return <Box height={maxHeight} flexDirection='column'>
    { visibleItems.map((item, i) => children(item, i + windowStart === selected)) }
    { visibleItems.length === 0 && emptyMessage() }
  </Box>
}
