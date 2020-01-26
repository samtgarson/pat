import { KeyValue } from "@/types/postman/misc"

export const keyValueToHash = (arr: KeyValue[]) => arr.reduce(
  (hsh, { key, value }) => ({ ...hsh, [key]: value }),
  {}
)

export const hshToKeyValue = (hsh: { [key: string]: string }): KeyValue[] => Object.entries(hsh)
  .map(([key, value]) => ({ key, value }))
