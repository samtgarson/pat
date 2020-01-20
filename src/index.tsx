import pkg from '../package.json'
import Commander from 'commander'
import React from 'react'
import { render } from 'ink'
import App from './app'

const cmd = new Commander.Command()

cmd
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)

  .name('pat')
  .version(pkg.version)
  .description(pkg.description)
  .action(async () => {
    const { waitUntilExit } = render(
      <App />,
      { debug: !!process.env.PAT_DEBUG }
    )
    return waitUntilExit
  })

const main = async () => {
  try {
    await cmd.parseAsync(process.argv)
  } catch (e) {
    process.exit(1)
  }
}

main()

