import Commander from 'commander'
import React from 'react'
import { render } from 'ink'
import App from './app'
import Conf from 'conf'

const cmd = new Commander.Command()

cmd
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .name('pat')
  .version(process.env.PAT_VERSION || 'next')
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
  .action(() => console.log(new Conf().path))

const main = async () => {
  try {
    await cmd.parseAsync(process.argv)
  } catch (e) {
    process.exit(1)
  }
}

main()

