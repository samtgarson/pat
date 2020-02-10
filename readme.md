📮

**pat**—_postman on the command line_

Pat is an interactive Postman CLI built with [Ink](https://github.com/vadimdemedes/ink).

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fsamtgarson%2Fpat%2Fbadge&style=flat)](https://actions-badge.atrox.dev/samtgarson/pat/goto)

## Why?

I was bummed out to find one of the only things I couldn't use after moving to an iPad as my daily development machine was Postman, so I'm trying to build a command line replacement. _Currently Pat only supports collections available on the Postman Pro API. PR's welcome to improve this._

### Progress

- [x] Fetch collections from the API
- [x] Edit the environment
- [x] Make basic requests
- [x] Authentication
- [ ] More authentication
- [ ] Request history
- [ ] Add other collection formats
  - [ ] Postman JSON files
  - [ ] Insomnia

## Install and Use

```bash
npm install --global pat

pat # follow the instructions from here
```

## Contribute

Bug reports and pull requests are welcome on GitHub at https://github.com/samtgarson/pat. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

### Develop

```sh
npm i        # Install dependencies
npm run test # Run tests
npm run dev  # Run the typescript compiler in watch mode

./bin/pat    # Run the CLI locally
```

### License

The module is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
