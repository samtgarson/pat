export const NEW_COLLECTION='NEW_COLLECTION'

export enum Pages {
  Home              = 'HOME',
  Request           = 'REQUEST',
  Auth              = 'AUTH',
  DeleteCollection  = 'DELETE_COLLECTION',
  ChooseCollection  = 'CHOOSE_COLLECTION',
  ChooseEnvironment = 'CHOOSE_ENVIRONMENT'
}

export enum AuthTypes {
  OAuth2 = 'OAuth 2',
  Basic  = 'Basic Auth'
}

export enum AuthTransportTypes {
  Header = 'Header',
  Query  = 'Query Param'
}

export const TIMEOUT = 30000
