import pkg from '../package.json'
import Commander from 'commander'
import React from 'react'
import { render } from 'ink'
import App from './app'
import { AppOptions } from '@/types/options'

const cmd = new Commander.Command()

cmd
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)

  .name('pat')
  .version(pkg.version)
  .description(pkg.description)
  .requiredOption('-k, --apiKey <apiKey>', 'Your Postman API key')
  .action(async ({ apiKey }: AppOptions) => {
    const { waitUntilExit } = render(<App apiKey={ apiKey }/>)
    return waitUntilExit
  })

const main = async () => {
  try {
    await cmd.parseAsync(process.argv)
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
}

main()

