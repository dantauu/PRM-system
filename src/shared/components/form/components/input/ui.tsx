import './style.scss'
import { EyeHideIcon, EyeShowIcon } from '@/shared/assets'
import { useTelephoneMask } from '@/shared/hooks'
import classNames from 'classnames'
import { ChangeEvent, FC, memo, useCallback, useId, useMemo, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

interface InputProps {
  className?: string

  type?: 'text' | 'password' | 'textarea' | 'telephone' | string
  name?: string
  readOnly?: boolean
  disabled?: boolean
  rows?: number

  label?: string
  placeholder?: string
  caption?: string
  size?: 'sm' | 'lg'

  value?: string
  onChange?: (value: string) => void
}

export const Input: FC<InputProps> = ({
  className,

  type,
  name,
  readOnly,
  disabled,
  rows,

  label,
  placeholder,
  caption,
  size = 'lg',

  value,
  onChange,
}) => {
  // Hooks
  const id = useId()
  const {
    maskedValue,
    handleChange: handleTelephoneChange,
    handleKeyDown,
  } = useTelephoneMask(value || '', type === 'telephone' ? onChange : null)

  // State
  const [isShow, setIsShow] = useState(false)

  // Variables
  const ClassName = classNames('my-input', className)
  const validValue = type === 'telephone' ? maskedValue : value
  const ShowStateIcon = !isShow ? EyeShowIcon : EyeHideIcon

  // Memo
  const validType = useMemo(() => {
    if (type === 'telephone') {
      return 'text'
    }

    if (type === 'password' && isShow) {
      return 'text'
    }

    if (type === 'textarea') {
      return undefined
    }

    return type
  }, [isShow, type])

  // Handlers
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const changedValue = event.target.value

      if (type === 'telephone') {
        handleTelephoneChange(changedValue)
        return
      }

      onChange?.(changedValue)
    },
    [handleTelephoneChange, onChange, type]
  )

  const handleIsShowToggled = useCallback(() => setIsShow((prev) => !prev), [])

  return (
    <Form.Group
      className={ClassName}
      controlId={id}
    >
      {label && <Form.Label>{label}</Form.Label>}

      <InputGroup>
        <Form.Control
          as={type === 'textarea' ? 'textarea' : undefined}
          className="my-input__input"
          size={size}
          type={validType}
          name={name}
          readOnly={readOnly}
          disabled={disabled}
          rows={type === 'textarea' ? rows || 3 : undefined}
          placeholder={placeholder}
          value={validValue}
          onKeyDown={type === 'telephone' ? handleKeyDown : undefined}
          onChange={handleChange}
        />
        {type === 'password' && (
          <Button
            variant="outline-secondary"
            onClick={handleIsShowToggled}
          >
            <ShowStateIcon
              width={24}
              height={24}
            />
          </Button>
        )}
      </InputGroup>

      {caption && <Form.Text>{caption}</Form.Text>}
    </Form.Group>
  )
}

export const MemoInput = memo(Input)
