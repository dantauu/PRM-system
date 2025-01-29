import { BuildOptions } from './types'

export const getIsDev = ({ mode }: BuildOptions) => mode === 'development'
export const getIsProd = ({ mode }: BuildOptions) => mode === 'production'
