import { BuildOptions } from '../types'
import { buildCssStyleLoader, buildScssStyleLoader } from './build-style-loader'
import { buildSvgrLoader } from './build-svgr-loader'
import { buildTsLoader } from './build-ts-loader'
import { ModuleOptions } from 'webpack'

type LoadersType = ModuleOptions['rules']

export function buildLoaders(options: BuildOptions): LoadersType {
  // Assets
  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif|mp4|webp)$/i,
    type: 'asset/resource',
  }

  const svgrLoader = buildSvgrLoader(options)

  // Typescript
  const tsLoader = buildTsLoader(options)

  // Для поддержки модулей
  const cssStyleLoaderWithModules = buildCssStyleLoader(options, true)
  const scssStyleLoaderWithModules = buildScssStyleLoader(options, true)

  // Для поддержки обычных стилей
  const cssStyleLoaderWithoutModules = buildCssStyleLoader(options)
  const scssStyleLoaderWithoutModules = buildScssStyleLoader(options)

  return [
    assetLoader,
    svgrLoader,
    tsLoader,
    scssStyleLoaderWithModules,
    scssStyleLoaderWithoutModules,
    cssStyleLoaderWithModules,
    cssStyleLoaderWithoutModules,
  ]
}
