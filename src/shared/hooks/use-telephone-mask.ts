import { KeyboardEvent, useCallback, useEffect, useState } from 'react'

// eslint-disable-next-line no-empty-character-class
const parseValue = (value: string) => {
  const trimed = value?.trim()
  const noSpace = trimed?.replaceAll(' ', '')
  const onlyValidSymbols = noSpace?.replaceAll(/[^\d]/gi, '')
  const replace7to8 = onlyValidSymbols?.replaceAll(/^7/gi, '8')
  const startWith8 =
    replace7to8?.match(/^(8)/gi) || !replace7to8?.length ? replace7to8 : '8' + replace7to8

  return startWith8
}

const buildMask = (value: string) => {
  const s = value.split('')

  const builded = `+7 (${s[1] || 'X'}${s[2] || 'X'}${s[3] || 'X'}) ${s[4] || 'X'}${s[5] || 'X'}${
    s[6] || 'X'
  } ${s[7] || 'X'}${s[8] || 'X'} ${s[9] || 'X'}${s[10] || 'X'}`

  const firstXIndex = builded.split('').findIndex((sym) => sym === 'X')

  return firstXIndex === -1 ? builded : builded.slice(0, firstXIndex)
}

export const useTelephoneMask = (
  value?: string,
  onChange: ((value: string) => void) | undefined | null = null
) => {
  // State
  const [validValue, setValidValue] = useState(parseValue(value))

  const [maskedValue, setMaskedValue] = useState(buildMask(parseValue(value)))

  // Handlers
  const handleChange = useCallback(
    (value: string) => {
      const parsed = parseValue(value)

      setValidValue(parsed)
      setMaskedValue(buildMask(parsed))
      onChange?.(parsed)
    },
    [onChange]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.code === 'Backspace') {
        event.stopPropagation()
        event.preventDefault()

        const parsed = validValue
        const deleted = parsed.length === 0 ? parsed : parsed.slice(0, parsed.length - 1)

        setValidValue(deleted)
        setMaskedValue(buildMask(deleted))
        onChange?.(deleted)
      }
    },
    [onChange, validValue]
  )

  // Effects
  useEffect(() => {
    if (!onChange) {
      return
    }

    const parsed = parseValue(value)

    if (parsed === validValue) {
      return
    }

    setValidValue(parseValue(parsed))
    setMaskedValue(buildMask(parsed))
    onChange(parsed)
  }, [onChange, validValue])

  return { validValue, maskedValue, handleChange, handleKeyDown }
}

// Инициализация
// Значения отфармотированы
// Вернули валидное значение и значение маски
// Значение изменено
// Парсим маску
// Сохраняем валидное значение
// Возвращаем новое валидное значение и значение маски
