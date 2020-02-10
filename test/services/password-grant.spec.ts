/* eslint-disable @typescript-eslint/camelcase */
import { passwordGrant } from "@/src/services/password-grant"
import mockAxios from 'jest-mock-axios'


describe('password grant', () => {
  let result: Promise<string>
  let error: Error
  const username = 'username'
  const password = 'password'
  const url = 'url'
  const params = { username, password, url }

  beforeEach(async () => {
    result = passwordGrant(params)
  })

  it('makes a POST', () => {
    mockAxios.mockResponse({ data: { access_token: 'token' } })

    expect(mockAxios.post).toHaveBeenCalledWith(url, {
      grant_type: 'password',
      username,
      password
    })
    return result
  })

  it('returns the token', () => {
    mockAxios.mockResponse({ data: { access_token: 'token' } })
    return expect(result).resolves.toEqual('token')
  })

  it('it raises a regular error', () => {
    const err = new Error('oh noes')
    mockAxios.mockError(err)
    return expect(result).rejects.toEqual(err)
  })

  it('it wraps an axios error', () => {
    mockAxios.mockError({ isAxiosError: true, response: { status: 401 } })
    return expect(result).rejects.toMatchObject({
      isPatError: true,
      message: 'Could not fetch access token (status 401)'
    })
  })
})
