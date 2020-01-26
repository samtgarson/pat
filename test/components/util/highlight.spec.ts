import { stringToMatches } from '@/src/components/util/highlight'

describe('stringToMatches', () => {
  const text = 'abc/123?a=1,2'
  const indexes = [
    text.indexOf('/'),
    text.indexOf('='),
    text.indexOf(',')
  ]
  const match = /[/,=]/g

  it('returns the correct matches', () => {
    const result = stringToMatches(text, match)

    const expected = indexes.map(i => [i, i + 1])
    expect(result).toEqual(expected)
  })
})
