import { AxiosResponse } from "axios"
import { PlainObj } from "@/types/postman/misc"
import { titleize } from 'inflection'
import chalk from 'chalk'
import mime from 'mime-types'

export class Response {
  constructor (private response: AxiosResponse) {}

  get summary () {
    const { status, headers: resHeaders, request } = this.response
    const headers = request.getHeaders()

    return chalk`
{yellow ${request.method}} ${request.path}
${this.formatHeaders(headers)}

{yellow ${status}} ${this.statusText}
${this.formatHeaders(resHeaders)}
`.trim()
  }

  get data () {
    const { data } = this.response
    if (typeof data === 'string') return data
    return JSON.stringify(data, null, 2)
  }

  get fileType () {
    const { headers } = this.response
    return mime.extension(headers['content-type']) || 'txt'
  }

  private get statusText () {
    const { status, statusText } = this.response
    let color = chalk.whiteBright
    if (status >= 200 && status < 300) color = chalk.green
    if (status >= 300 && status < 400) color = chalk.yellow
    if (status >= 400 && status < 500) color = chalk.red
    if (status >= 500) color = chalk.magenta

    return color(statusText)
  }

  private formatHeaders (headers: PlainObj) {
    return Object.entries(headers)
      .map(([k, v]) => chalk`{white ${titleize(k)}:} {cyan ${v}}`)
      .join('\n')
  }
}
