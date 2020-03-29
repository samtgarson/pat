/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import cjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import paths from 'rollup-plugin-typescript-paths'
import externals from '@yelo/rollup-node-external'
import shebang from '@robmarr/rollup-plugin-shebang'
import executable from 'rollup-plugin-executable'

const production = process.env.NODE_ENV === 'production'

const config = {
  input: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    file: path.resolve(__dirname, 'bin/pat'),
    format: 'cjs'
  },
  external: externals(),
  plugins: [
    json(),
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.build.json' )
    }),
    cjs(),
    resolve({ preferBuiltins: true }),
    paths(),
    production && terser(),
    shebang(),
    executable()
  ]
}

export default config
