import './style.scss'
import { Button } from '@/shared/components'
import { $$globalStrategyStatusColor } from '@/shared/effector'
import classNames from 'classnames'
import { FC, memo, useState } from 'react'
import { ColorPicker, useColor } from 'react-color-palette'
import 'react-color-palette/css'
import Skeleton from 'react-loading-skeleton'

interface SimpleColorPickerProps {
  className?: string
  colors: Array<{ value: number; color: string }>
  pending?: boolean
  value?: number
  onChange?: (value: number) => void
}

export const SimpleColorPicker: FC<SimpleColorPickerProps> = ({
  className,
  colors,
  pending,
  value,
  onChange,
}) => {
  // Variables
  const ClassName = classNames('simple-color-picker', className)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [color, setColor] = useColor('cyan')
  const handleAddColor = () => {
    setShowColorPicker(!showColorPicker)
  }

  const handleColorConfirm = async () => {
    $$globalStrategyStatusColor.postColor.submited({ color_HEX: color.hex })
    setShowColorPicker(false)
  }
  // Render
  const renderItems = () => {
    if (pending) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item) => (
        <Skeleton
          key={item}
          containerClassName={classNames(
            'simple-color-picker__item',
            'simple-color-picker__item--skeleton'
          )}
        />
      ))
    }

    return colors.map(({ value: innerValue, color }) => (
      <div
        key={innerValue}
        className={classNames(
          'simple-color-picker__item',
          value === innerValue && 'simple-color-picker__item--active'
        )}
        style={{ backgroundColor: color }}
        onClick={() => onChange(innerValue)}
      />
    ))
  }

  return (
    <div className={ClassName}>
      <div className="simple-color-picker__title">Цвета</div>
      <div className="simple-color-picker__items">
        {renderItems()}
        <button
          className="simple-color-picker__button"
          onClick={handleAddColor}
        >
          +
        </button>
      </div>

      {showColorPicker && (
        <div className="simple-color-picker__color-picker">
          <ColorPicker
            color={color}
            onChange={setColor}
          />
          <Button
            variant={'primary'}
            onClick={handleColorConfirm}
          >
            Подтвердить
          </Button>
        </div>
      )}
    </div>
  )
}

export const MemoSimpleColorPicker = memo(SimpleColorPicker)
