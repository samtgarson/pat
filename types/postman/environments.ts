import { KeyValue } from './misc'

export interface BaseEnvironmentAttributes {
  id?: string
  name: string
  uid: string
}

export interface EnvironmentVariable extends KeyValue {
  enabled: boolean
}

export interface Environment extends BaseEnvironmentAttributes {
  values: EnvironmentVariable[]
}
