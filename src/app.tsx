import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { Text, Color } from 'ink'

function App ({ apiKey }: InferProps<typeof App.propTypes>) {
  return (
    <Text>
      Hello, <Color green>{ apiKey  }</Color>
    </Text>
  )
}

App.propTypes = {
	apiKey: PropTypes.string
}

export default App

