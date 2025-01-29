import './style.scss'
import classNames from 'classnames'
import { ChangeEvent, FC, memo, useCallback, useId } from 'react'
import { Form } from 'react-bootstrap'

interface ColorPickerProps {
  className?: string

  label?: string
  caption?: string
  size?: 'sm' | 'lg'

  value?: string
  onChange?: (value: string) => void
}

export const ColorPicker: FC<ColorPickerProps> = ({
  className,

  label,
  caption,
  size = 'lg',

  value,
  onChange,
}) => {
  // Hooks
  const id = useId()

  // Variables
  const ClassName = classNames('color-picker', className)

  // Handlers
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.value)
    },
    [onChange]
  )

  return (
    <Form.Group
      className={ClassName}
      controlId={id}
    >
      {label && <Form.Label>{label}</Form.Label>}

      <Form.Control
        id={id}
        type="color"
        size={size}
        defaultValue="#563d7c"
        value={value || ''}
        onChange={handleChange}
      />

      {caption && <Form.Text>{caption}</Form.Text>}
    </Form.Group>
  )
}

export const MemoColorPicker = memo(ColorPicker)
