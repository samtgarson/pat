#!/usr/bin/env node

import React from 'react'
import { render } from 'ink'
import meow from 'meow'
import ui from './ui'
import { AppOptions } from '@/types/options'

const cli = meow<AppOptions>(`
	Usage
	  $ pat

	Options
		--apiKey  Your Postman API Key
`)

render(React.createElement(ui, cli.flags))
