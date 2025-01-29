import { BuildMode, buildWebpack } from './config/webpack'
import path from 'path'

interface Env {
  mode?: BuildMode
  port?: number
  analyzer?: boolean
}

export default (env: Env) => {
  return buildWebpack({
    mode: env.mode ?? 'development',
    port: env.port ?? 5000,
    paths: {
      entry: path.resolve(__dirname, 'src', 'index.tsx'),
      output: path.resolve(__dirname, 'build'),
      html: path.resolve(__dirname, 'public', 'index.html'),
      src: path.resolve(__dirname, 'src'),
      public: path.resolve(__dirname, 'public'),
    },
    analyzer: !!env.analyzer,
  })
}
