import { Request } from '@/src/models/request'
import { Request as RawRequest, Method } from '@/types/postman/collection'
import { hshToKeyValue } from '@/src/utils/key-value-converter'

describe('Request', () => {
  const env = { foo: 'bar' }
  let req: Request

  const defaultRequest: RawRequest = {
    url: {
      host: ['{{ foo }}'],
      query: hshToKeyValue({
        include: 'accounts',
        custom: '{{foo}}',
        new: 'woof'
      }),
      path: ['bar', ':baz', ':bloop'],
      raw: '',
      variable: [{
        key: 'baz',
        value: 'blam',
        id: 'id',
        description: {
          content: 'description',
          type: 'type'
        },
        type: 'type'
      }]
    },
    method: Method.Get,
    description: 'description',
    header: []
  }

  beforeEach(() => {
    req = new Request(defaultRequest, [])
  })

  it('delegates attributes', () => {
    expect(req).toMatchObject({
      description: defaultRequest.description,
      method: defaultRequest.method
    })
  })

  describe('withEnv', () => {
    it('sets the env', () => {
      expect(req.environment).toEqual({})
      expect(req.withEnv(env).environment).toEqual(env)
    })
  })

  describe('with environment', () => {
    const vars = { new: 'new' }
    const params = { baz: 'blam', bloop: 'bleep' }

    beforeEach(() => {
      req = req.withEnv(env)
    })

    describe('host', () => {
      it('templates the environment', () => {
        expect(req.host).toEqual('bar')
      })
    })

    describe('hasVariables', () => {
      it('is true when there are variables', () => {
        expect(req.hasVariables).toBeTruthy()
      })

      it('is false when there are no variables', () => {
        req.variables = {}
        expect(req.hasVariables).toBeFalsy()
      })
    })

    describe('hasQuery', () => {
      it('is true when there is a query', () => {
        expect(req.hasQuery).toBeTruthy()
      })

      it('is false when there is no query', () => {
        req._query = {}
        expect(req.hasQuery).toBeFalsy()
      })
    })

    describe('formatPath', () => {
      it('templates the path', () => {
        expect(req.formatPath(params)).toEqual('/bar/blam/bleep')
      })
    })

    describe('formatQuery', () => {
      it('templates the query', () => {
        const result = req.formatQuery(vars)
        expect(result).toEqual('include=accounts&custom=bar&new=new')
      })
    })

    describe('axiosRequest', () => {
      it('returns valid axios request config', () => {
        const result = req.axiosRequest(vars, params)
        expect(result).toEqual({
          baseURL: 'bar',
          method: 'GET',
          params: {
            new: 'new',
            custom: 'bar',
            include: 'accounts'
          },
          url: '/bar/blam/bleep'
        })
      })
    })
  })
})
