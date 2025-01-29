import './style.scss'
import classNames from 'classnames'
import { ChangeEvent, FC, memo, useCallback, useId, useMemo } from 'react'
import { Form, InputGroup } from 'react-bootstrap'

interface SelectProps<Value extends string | number = string | number> {
  className?: string

  name?: string
  disabled?: boolean

  label?: string
  caption?: string
  size?: 'sm' | 'lg'

  items?: Array<{ value: Value; text: string }>
  value?: Value | null
  onChange?: (value: Value | null) => void

  withNoValue?: boolean
}

export const Select: FC<SelectProps> = ({
  className,

  name,
  disabled,

  label,
  caption,
  size = 'lg',

  items = [],
  value,
  onChange,

  withNoValue,
}) => {
  // Hooks
  const id = useId()

  // Variables
  const ClassName = classNames('select', className)

  // Memo
  const memoItems = useMemo(
    () => (withNoValue ? [{ value: -1, text: 'Не выбрано' }, ...items] : items),
    [items, withNoValue]
  )

  // Handlers
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const changedValue = event.target.value

      onChange?.(changedValue === '-1' ? null : parseInt(changedValue) || changedValue)
    },
    [onChange]
  )

  return (
    <Form.Group
      className={ClassName}
      controlId={id}
    >
      {label && <Form.Label>{label}</Form.Label>}

      <InputGroup>
        <Form.Select
          className="input__input"
          size={size}
          name={name}
          disabled={disabled}
          value={value || ''}
          onChange={handleChange}
        >
          {memoItems.map(({ value, text }) => (
            <option
              key={value}
              value={value}
            >
              {text}
            </option>
          ))}
        </Form.Select>
      </InputGroup>

      {caption && <Form.Text>{caption}</Form.Text>}
    </Form.Group>
  )
}

export const MemoSelect = memo(Select)
