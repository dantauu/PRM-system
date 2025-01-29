import { BuildOptions } from './types'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'

export function buildDevServer({ port }: BuildOptions): DevServerConfiguration {
  return {
    port: port,
    historyApiFallback: true,
    open: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'https://backmoon.prm4all.com',
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
        secure: false,
      },
    },
  }
}
