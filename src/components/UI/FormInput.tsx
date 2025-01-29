import IFormInput from '../../interfaces/IFormInput'
import './stylesUI/FormInput/FormInput.css'
import classNames from 'classnames'
import React, { FC, useState } from 'react'

const FormInput: FC<IFormInput> = ({
  className,
  styles,

  name,
  title,
  placeholder,
  important = false,
  visibility = false,
  date = false,

  value,
  onChange,
}) => {
  // State
  const [visibilityState, setVisibilityState] = useState<boolean>(true)

  // Varialbes
  const ClassName = classNames('FormInput', className)

  // Handlers
  const visibilityStateHandler = () => {
    visibilityState ? setVisibilityState(false) : setVisibilityState(true)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = e.target.value
    onChange?.(inputValue)
  }

  return (
    <div
      className={ClassName}
      style={styles}
    >
      <div className="FormInput__title">
        <h3 className="FormInput__title__text">{title}</h3>
        <h3 className="important">{important ? '*' : ''}</h3>
      </div>
      <div
        style={{ display: visibility ? 'flex' : 'block', alignItems: 'center' }}
        className="inputCountainer"
      >
        <input
          className="FormInput-input"
          id={visibility ? 'FormInput-input-date' : ''}
          name={name}
          type={visibilityState && visibility ? 'password' : date ? 'date' : 'text'}
          onFocus={(e) => (date ? (e.target.type = 'date') : (e.target.type = 'text'))}
          onBlur={(e) => (e.target.type = 'text')}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        {visibility ? (
          <div
            className={visibilityState ? 'text_show' : 'text_hide'}
            onClick={visibilityStateHandler}
          ></div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default FormInput
