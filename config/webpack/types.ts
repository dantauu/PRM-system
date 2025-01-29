export type BuildMode = 'development' | 'production'

export interface BuildPaths {
  entry: string
  output: string
  html: string
  src: string
  public: string
}

export interface BuildOptions {
  mode: BuildMode
  port: number
  paths: BuildPaths
  analyzer: boolean
}
