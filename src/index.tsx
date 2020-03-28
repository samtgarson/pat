import Commander from 'commander'
import React from 'react'
import { render } from 'ink'
import App from './app'
import pkg from '@/package.json'
import { config } from '@/src/utils/config'

// eslint-disable-next-line import/no-extraneous-dependencies
if (process.env.NODE_ENV === 'production') require('source-map-support').install()

const cmd = new Commander.Command()

cmd
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .name('pat')
  .version(pkg.version)
  .description('Postman on your command line')

cmd
  .command('post', { isDefault: true })
  .description('Run Pat to deliver some post')
  .action(async () => {
    const { waitUntilExit } = render(
      <App />,
      {
        experimental: true,
        debug: !!process.env.PAT_DEBUG
      }
    )
    await waitUntilExit
  })

cmd
  .command('config-path')
  .description('Print the path to the config file')
  .action(() => console.log(config.path))

const main = async () => {
  try {
    await cmd.parseAsync(process.argv)
  } catch (e) {
    process.exit(1)
  }
}

main()

