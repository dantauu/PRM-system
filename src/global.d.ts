declare module '*.module.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.mp4'
declare module '*.webp'
declare module 'd3'

declare module '*.svg' {
  import React from 'react'
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
  export default SVG
}

declare const __ENV__: 'production' | 'development'

interface Window {
// eslint-disable-next-line eqeqeq
  ethereum: any; 
}

