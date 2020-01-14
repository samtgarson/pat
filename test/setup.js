const mockAxios = require('jest-mock-axios')

beforeEach(() => {
  mockAxios.default.reset()
})

