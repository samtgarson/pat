import React, {  FunctionComponent } from 'react'
import { Color, Box } from 'ink'
import Spinner from 'ink-spinner'

const Loader: FunctionComponent = ({ children }) =>
  <Box>
    <Box width={2}>
      <Color blue><Spinner type="dots" /></Color>
    </Box>
    { children }
  </Box>

export default Loader


