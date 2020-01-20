export interface BaseEnvironmentAttributes {
  id?: string
  name: string
  uid: string
}

export type EnvironmentVariable = {
  enabled: boolean
  key: string
  value: string
}

export interface Environment extends BaseEnvironmentAttributes {
  values: EnvironmentVariable[]
}
