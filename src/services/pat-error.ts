export default class PatError extends Error {
  isPatError = true

  static isPatError (e: any): e is PatError {
    return e.isPatError === true
  }
}

