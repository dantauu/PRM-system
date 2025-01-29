import { BuildOptions } from '../types'
import { getIsDev } from '../utils'
import ReactRefreshTypeScript from 'react-refresh-typescript'

export function buildTsLoader(options: BuildOptions) {
  const isDev = getIsDev(options)

  return {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
        },
      },
    ],
    exclude: /node_modules/,
  }
}
