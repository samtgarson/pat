export default class PatError extends Error {
  isPatError = true
  originalError?: Error

  constructor (message: string, orig?: Error) {
    super(message)
    this.originalError = orig
  }

  static isPatError (e: any): e is PatError {
    return e.isPatError === true
  }
}

