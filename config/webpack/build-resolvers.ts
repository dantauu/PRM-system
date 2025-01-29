import { BuildOptions } from './types'
import { Configuration } from 'webpack'

type ResolversType = Configuration['resolve']

export function buildResolvers(options: BuildOptions): ResolversType {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': options.paths.src,
    },
  }
}
