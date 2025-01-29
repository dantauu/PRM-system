import { BuildOptions } from '../types'
import { getIsDev } from '../utils'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function buildCssStyleLoader(options: BuildOptions, withModules: boolean = false) {
  const isDev = getIsDev(options)

  if (!withModules) {
    return {
      test: /(?<!\.module)\.css$/i,
      use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
    }
  }

  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]--[hash:base64:8]' : '[hash:base64:8]',
      },
    },
  }

  return {
    test: /\.module\.css$/i,
    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, cssLoaderWithModules],
  }
}

export function buildScssStyleLoader(options: BuildOptions, withModules: boolean = false) {
  const isDev = getIsDev(options)

  if (!withModules) {
    return {
      test: /(?<!\.module).s[ac]ss$/i,
      use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    }
  }

  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]--[hash:base64:8]' : '[hash:base64:8]',
      },
    },
  }

  return {
    test: /\.module\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssLoaderWithModules,
      'sass-loader',
    ],
  }
}
