import { BaseCollectionAttributes } from "./postman/collection"
import { AuthTypes, AuthTransportTypes } from "@/src/constants"
import { PlainObj } from "./postman/misc"
import { PasswordGrantParams } from "@/src/services/password-grant"

export type StoredWorkspace = {
  apiKey: string
  name: string
  id: string
}

export interface StoredCollection extends BaseCollectionAttributes {
  workspaceID: string
  environment?: PlainObj
  authentication?: AuthenticationConfig
}

export type AuthenticationConfig = BasicAuthConfig | OAuth2Config

export type BasicAuthConfig = {
  type: AuthTypes.Basic
  config: PlainObj
  transport: AuthTransportTypes
}

export type OAuth2Config = {
  type: AuthTypes.OAuth2
  config: PasswordGrantParams
  transport: AuthTransportTypes
}

