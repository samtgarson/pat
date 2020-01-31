import { KeyValue, Description } from './misc'

export interface BaseCollectionAttributes {
  id?: string
  name: string
  uid: string
}

export interface Collection {
  uid:      string
  info:     Info
  item:     Item[]
  auth:     Auth
  event:    Event[]
  variable: Oauth2Element[]
}

export interface Auth {
  type:   string
  oauth2?: Oauth2Element[]
}

export interface Oauth2Element {
  key:   string
  value: string
  type:  string
  id?:   string
}

export interface Event {
  listen: string
  script: Script
}

export interface Script {
  id:   string
  type: string
  exec: string[]
}

export interface Info {
  _postman_id: string
  name:        string
  description: string
  schema:      string
}

export interface Item {
  name:                     string
  _postman_id:              string
  protocolProfileBehavior?: ProtocolProfileBehavior
  request?:                 Request
  response?:                Response[]
  item?:                    Item[]
  _postman_isSubFolder?:    boolean
}

export interface Request {
  auth?:        Auth
  body?:        Body
  description?: string
  header:       KeyValue[]
  method:       Method
  url:          RequestURL
}

export enum Method {
  Delete = 'DELETE',
  Get    = 'GET',
  Patch  = 'PATCH',
  Post   = 'POST',
  Put    = 'PUT'
}

export interface Response {
  _postman_previewlanguage?: string
  body?:                     string
  code?:                     number
  cookie:                    any[]
  header?:                   KeyValue[]
  id:                        string
  name:                      string
  originalRequest:           Request
  responseTime?:             number
  status?:                   string
}

export interface Body {
  mode: string
  raw:  string
}

export interface RequestURL {
  raw:       string
  host:      string[]
  protocol?: string
  path:      string[]
  variable?: URLVariable[]
  query?:    KeyValue[]
}

export interface URLVariable extends KeyValue {
  id:          string
  type:        string
  description: Description
}

export enum Status {
  BadRequest = "Bad Request",
  Created = "Created",
  InternalServerError = "Internal Server Error",
  NoContent = "No Content",
  NotFound = "Not Found",
  Ok = "OK",
  Unauthorized = "Unauthorized",
}

export interface ProtocolProfileBehavior {
  disableBodyPruning: boolean
}

