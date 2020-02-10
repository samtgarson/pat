import { KeyValue, PlainObj } from "@/types/postman/misc"

export const keyValueToHash = (arr: KeyValue[]) => arr.reduce(
  (hsh, { key, value }) => ({ ...hsh, [key]: value }),
  {}
)

export const hshToKeyValue = (hsh: Partial<PlainObj>): KeyValue[] => Object.entries(hsh)
  .map(([key, value = '']) => ({ key, value }))
