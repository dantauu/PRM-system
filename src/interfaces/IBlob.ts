interface IBlob {
  width: number | string
  height?: number
  position: 'relative' | 'absolute' | 'fixed' | 'static'
  top?: string
  left?: string
  right?: string
  bottom?: string
  display?: string
}

export default IBlob
