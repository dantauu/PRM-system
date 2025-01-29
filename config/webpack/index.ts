import { buildDevServer } from './build-dev-server'
import { buildLoaders } from './build-loaders'
import { buildPlugins } from './build-plugins'
import { buildResolvers } from './build-resolvers'
import { BuildOptions } from './types'
import { getIsDev } from './utils'
import { Configuration } from 'webpack'

export function buildWebpack(options: BuildOptions): Configuration {
  const isDev = getIsDev(options)

  const { mode, paths } = options

  const { entry, output } = paths

  return {
    mode,

    entry,
    output: {
      filename: 'js/[name].[contenthash].js',
      assetModuleFilename: 'assets/[name][ext]',
      path: output,
      clean: true,
      publicPath: '/',
    },

    optimization: {
      // usedExports: true,
      // sideEffects: true,
    },

    plugins: buildPlugins(options),

    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),

    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
    devServer: isDev ? buildDevServer(options) : undefined,
  }
}

export * from './types'
