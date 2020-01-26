import { hshToKeyValue, keyValueToHash } from '@/src/utils/key-value-converter'

describe('keyValueToHash', () => {
  const arr = [
    { key: 'foo', value: 'bar' },
    { key: 'bar', value: 'baz' }
  ]

  it('converts a hash to a KeyValue array', () => {
    const result = keyValueToHash(arr)

    expect(result).toEqual({ foo: 'bar', bar: 'baz' })
  })
})

describe('hshToKeyValue', () => {
  const hsh = { foo: 'bar', bar: 'baz' }

  it('converts a hash to a KeyValue array', () => {
    const result = hshToKeyValue(hsh)

    expect(result).toEqual([
      { key: 'foo', value: 'bar' },
      { key: 'bar', value: 'baz' }
    ])
  })
})
