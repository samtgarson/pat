export interface BaseCollectionAttributes {
  id?: string;
  name: string;
  uid: string;
}

export interface Collection {
  uid:      string;
  info:     Info;
  item:     CollectionItem[];
  auth:     CollectionAuth;
  event:    Event[];
  variable: Oauth2Element[];
}

export interface CollectionAuth {
  type:   string;
  oauth2: Oauth2Element[];
}

export interface Oauth2Element {
  key:   string;
  value: string;
  type:  VariableType;
  id?:   string;
}

export enum VariableType {
  String = "string",
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

export interface CollectionItem {
  name:        string;
  item?:       Item[];
  _postman_id: string;
  request?:    Request;
  response?:   Response[];
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
  auth:         RequestAuth;
  body?:        Body;
  description?: string;
  header:       Header[];
  method:       Method;
  url:          RequestURL;
}

export interface Response {
  _postman_previewlanguage?: PostmanPreviewlanguage;
  boey?:                     string;
  code?:                     number;
  cookie:                    any[];
  header?:                   Header[];
  id:                        string;
  name:                      string;
  originalRequest:           OriginalRequest;
  responseTime?:             number;
  status?:                   Status;
}

export interface RequestAuth {
  type: AuthType;
}

export enum AuthType {
  Noauth = "noauth",
}

export interface Body {
  mode: Mode;
  raw:  string;
}

export enum Mode {
  Raw = "raw",
}

export enum Method {
  Delete = "DELETE",
  Get = "GET",
  Patch = "PATCH",
  Post = "POST",
}

export interface RequestURL {
  raw:       string;
  host:      Host[];
  path:      string[];
  variable?: URLVariable[];
  query?:    Header[];
}

export enum Host {
  BaseURL = "{{baseUrl}}",
}

export interface Header {
  description?: string;
  key:          string;
  value:        string;
}

export interface URLVariable {
  id:          string;
  key:         string;
  value:       string;
  type:        VariableType;
  description: Description;
}

export interface Description {
  content: string;
  type:    DescriptionType;
}

export enum DescriptionType {
  TextPlain = "text/plain",
}


export enum PostmanPreviewlanguage {
  Text = "text",
}

export interface OriginalRequest {
  method: Method;
  header: Header[];
  url:    RequestURL;
  body?:  Body;
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

