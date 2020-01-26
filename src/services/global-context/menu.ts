import { useState } from 'react'
import { MenuParams, MenuItems } from '@/types/menu'

export const createMenuState = () => {
  const [params, setParams] = useState<MenuParams>({ show: false, items: [] })

  const toggle = (items: MenuItems[] = []) => {
    if (params.show) return setParams({ show: false, items: [] })
    setParams({ show: true, items })
  }

  return { ...params, toggle }
}

