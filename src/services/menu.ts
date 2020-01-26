import { useInput } from "ink"
import { GlobalState } from "@/src/services/global-context"
import { MenuItems } from "@/types/menu"

export const useMenu = (items: MenuItems[] = []) => {
  const { menu: { toggle, show } } = GlobalState.useContainer()

  useInput(input => {
    if (!show && input === '?') toggle(items)
  })
}

