import { BuildOptions } from '../types'
import { getIsDev, getIsProd } from '../utils'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import { Configuration, DefinePlugin, ProgressPlugin } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

type PluginsType = Configuration['plugins']

export function buildPlugins(options: BuildOptions): PluginsType {
  const isDev = getIsDev(options)
  const isProd = getIsProd(options)

  const { mode, paths, analyzer } = options

  const plugins: PluginsType = [
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, 'favicon.ico'),
    }),
    new DefinePlugin({
      __ENV__: JSON.stringify(mode),
    }),
  ]

  if (isDev) {
    plugins.push(new ProgressPlugin())
    plugins.push(new ForkTsCheckerWebpackPlugin())
    plugins.push(new ReactRefreshWebpackPlugin())
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[name].[contenthash].css',
      })
    )
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin())
  }

  return plugins
}
