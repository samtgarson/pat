export interface KeyValue {
  description?: string | Description
  key:          string
  value:        string
}

export interface Description {
  content: string
  type:    string
}

export interface PlainObj { [key: string]: string }

