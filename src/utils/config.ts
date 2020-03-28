import Conf from 'conf'
import pkg from '@/package.json'

export const config = new Conf({ projectName: pkg.name, projectVersion: pkg.version })
