import { CSSProperties } from 'react'

interface IFormInput {
  className?: string

  styles?: CSSProperties
  stylesCont?: CSSProperties

  name?: string
  title: string
  placeholder: string

  important?: boolean
  visibility?: boolean
  date?: boolean

  value?: string
  onChange?: (value: string) => void
}
export default IFormInput
