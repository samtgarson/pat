/* eslint-disable @typescript-eslint/camelcase */
import Axios from "axios"
import PatError from "@/src/models/pat-error"
import { PlainObj } from "@/types/postman/misc"

export interface PasswordGrantParams extends Partial<PlainObj> {
  client_id?:     string
  client_secret?: string
  username:       string
  password:       string
  url:            string
}

export const passwordGrant = async ({ url, ...params }: PasswordGrantParams): Promise<string> => {
  try {
    const body = { ...params, grant_type: 'password' }
    const { data } = await Axios.post(url, body)

    if (!data.access_token) throw new PatError('Could not fetch access token')
    return data.access_token
  } catch (e) {
    if (e.isAxiosError) throw new PatError(`Could not fetch access token (status ${e.response.status})`, e)
    throw e
  }
}
