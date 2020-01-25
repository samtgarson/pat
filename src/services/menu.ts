import { useState } from "react"
import { useInput } from "ink"
import { MenuFactory } from "@/src/components/menu"

export const useMenu = () => {
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => setShowMenu(!showMenu)

  useInput(input => {
    if (!showMenu && input === '?') setShowMenu(true)
  })

  const hideMenu = () => setShowMenu(false)
  const Menu = MenuFactory(hideMenu)

  return { toggleMenu, showMenu, Menu }
}
