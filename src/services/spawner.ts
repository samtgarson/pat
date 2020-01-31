import { promises as fs } from 'fs'
import execa from 'execa'

const editor = process.env.EDITOR || 'vi'

// TODO Workout why less breaks the render but vim doesn't
// let previewer: string
// try {
//   execa.sync('which', ['bat'])
//   previewer = 'bat'
// } catch (e) {
//   previewer = 'less'
// }

const writeTempFile = async (data: string, extension = 'txt') => {
  const path = `/tmp/nodejs-pat-${Date.now()}.${extension}`
  await fs.writeFile(path, data)
  return path
}

export const edit = async (data = '') => {
  const path = await writeTempFile(data)
  execa.sync(editor, [path], { stdio: 'inherit' })
  const buf = await fs.readFile(path)
  return buf.toString().trim()
}

export const preview = async (data = '', format = 'txt') => {
  const path = await writeTempFile(data, format)
  return execa.sync(editor, [path], { stdio: 'inherit' })
}
