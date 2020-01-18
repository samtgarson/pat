export interface BaseCollectionAttributes {
  id?: string;
  name: string;
  uid: string;
}

export interface Collection {
  uid:      string;
  info:     Info;
  item:     Item[];
  auth:     Auth;
  event:    Event[];
  variable: Oauth2Element[];
}

export interface Auth {
  type:   string;
  oauth2?: Oauth2Element[];
}

export interface Oauth2Element {
  key:   string;
  value: string;
  type:  string;
  id?:   string;
}

export interface Event {
  listen: string;
  script: Script;
}

export interface Script {
  id:   string;
  type: string;
  exec: string[];
}

export interface Info {
  _postman_id: string;
  name:        string;
  description: string;
  schema:      string;
}

export interface Item {
  name:                     string;
  _postman_id:              string;
  protocolProfileBehavior?: ProtocolProfileBehavior;
  request?:                 Request;
  response?:                Response[];
  item?:                    Item[];
  _postman_isSubFolder?:    boolean;
}

export interface Request {
  auth?:        Auth;
  body?:        Body;
  description?: string;
  header:       Header[];
  method:       any;
  url:          RequestURL;
}

export type Method = "DELETE" | "GET" | "PATCH" | "POST"

export interface Response {
  _postman_previewlanguage?: string;
  body?:                     string;
  code?:                     number;
  cookie:                    any[];
  header?:                   Header[];
  id:                        string;
  name:                      string;
  originalRequest:           Request;
  responseTime?:             number;
  status?:                   string;
}

export interface Body {
  mode: string;
  raw:  string;
}

export interface RequestURL {
  raw:       string;
  host:      string[];
  path:      string[];
  variable?: URLVariable[];
  query?:    Header[];
}

export interface Header {
  description?: string | Description;
  key:          string;
  value:        string;
}

export interface URLVariable {
  id:          string;
  key:         string;
  value:       string;
  type:        string;
  description: Description;
}

export interface Description {
  content: string;
  type:    string;
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
  disableBodyPruning: boolean;
}

