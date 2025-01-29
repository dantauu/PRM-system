import { MemoColorPicker, MemoInput, MemoSelect, MemoSimpleColorPicker } from './components'
import { MemoForm } from './ui'

export const Form = Object.assign(MemoForm, {
  Input: MemoInput,
  Select: MemoSelect,
  ColorPicker: MemoColorPicker,
  SimpleColorPicker: MemoSimpleColorPicker,
})
