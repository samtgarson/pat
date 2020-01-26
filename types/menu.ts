export enum MenuItems {
  SwitchCollection = 'Use another collection',
  SwitchRequest    = 'Make another request',
  SwitchEnv        = 'Switch Envionment',
  Env              = 'Edit environment',
  Delete           = 'Delete this collection',
  Back             = 'Back'
}

export type MenuParams = {
  show: boolean
  items: MenuItems[]
  handler?: (event: MenuItems) => void
}

