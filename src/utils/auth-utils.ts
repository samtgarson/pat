import { OAuth2Config, AuthenticationConfig, BasicAuthConfig } from "@/types/config"
import { AuthTypes } from "../constants"

export const isOAuth2 = (conf: AuthenticationConfig): conf is OAuth2Config => (
  conf.type === AuthTypes.OAuth2
)

export const isBasicAuth = (conf: AuthenticationConfig): conf is BasicAuthConfig => (
  conf.type === AuthTypes.Basic
)

