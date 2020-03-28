import { Request } from '@/src/models/request'
import { Request as RawRequest, Method } from '@/types/postman/collection'
import { hshToKeyValue } from '@/src/utils/key-value-converter'
import { OAuth2Config } from '@/types/config'
import { AuthTypes, AuthTransportTypes, TIMEOUT } from '@/src/constants'
import { passwordGrant } from '@/src/services/password-grant'

const mockToken = 'token'
jest.mock('@/src/services/password-grant', () => ({ passwordGrant: jest.fn(async () => mockToken) }))

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

  const authConfig: OAuth2Config = {
    type: AuthTypes.OAuth2,
    transport: AuthTransportTypes.Header,
    config: {
      url: '',
      username: '',
      password: ''
    }
  }

  const axiosConfig = {
    baseURL: 'bar',
    data: '',
    method: 'GET',
    params: {
      new: 'new',
      custom: 'bar',
      include: 'accounts'
    },
    url: '/bar/blam/bleep',
    timeout: TIMEOUT
  }

  const vars = { new: 'new' }
  const params = { baz: 'blam', bloop: 'bleep' }

  beforeEach(() => {
    req = new Request(defaultRequest, [])
  })

  it('delegates attributes', () => {
    expect(req).toMatchObject({
      description: defaultRequest.description,
      method: defaultRequest.method
    })
  })

  describe('withConfig', () => {
    it('sets the env', () => {
      expect(req.environment).toEqual({})
      expect(req.withConfig(env).environment).toEqual(env)
    })

    it('sets the auth', () => {
      expect(req.environment).toEqual({})
      expect(req.authentication).toBeUndefined()

      const newReq = req.withConfig(env, authConfig)
      expect(newReq).toMatchObject({
        environment: env,
        authentication: authConfig
      })
    })
  })

  describe('with environment', () => {
    beforeEach(() => {
      req = req.withConfig(env)
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
        req['_query'] = {}
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
        return expect(result).resolves.toEqual(axiosConfig)
      })
    })
  })

  describe('with OAuth2 query config', () => {
    beforeEach(() => {
      const conf = { ...authConfig, transport: AuthTransportTypes.Query }
      req = req.withConfig(env, conf)
    })

    describe('axiosRequest', () => {
      it('returns valid axios request config', () => {
        const result = req.axiosRequest(vars, params)

        expect(passwordGrant).toHaveBeenCalledWith(authConfig.config)

        return expect(result).resolves.toEqual({
          ...axiosConfig,
          params: {
            ...axiosConfig.params,
            // eslint-disable-next-line @typescript-eslint/camelcase
            access_token: mockToken
          }
        })
      })
    })
  })

  describe('with OAuth2 header config', () => {
    beforeEach(() => {
      req = req.withConfig(env, authConfig)
    })

    describe('axiosRequest', () => {
      it('returns valid axios request config', () => {
        const result = req.axiosRequest(vars, params)

        expect(passwordGrant).toHaveBeenCalledWith(authConfig.config)

        return expect(result).resolves.toEqual({
          ...axiosConfig,
          headers: { Authorization: `Bearer ${mockToken}` }
        })
      })
    })
  })
})
