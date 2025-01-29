import './style.scss'
import { useTheme } from '@/shared/theme'
import classNames from 'classnames'
import { FC, memo } from 'react'
import ReactSpeedometer, { Transition } from 'react-d3-speedometer'

interface Item {
  id: number
  color: string
}

interface SpeedometerProps {
  className?: string

  label?: string

  items: Item[]
  activeId: number | null
}

export const Speedometer: FC<SpeedometerProps> = ({ className, label, items, activeId }) => {
  // Hooks
  const { theme } = useTheme()

  // Variables
  const ClassName = classNames('speedometer', className)
  const colors = items.map(({ color }) => color)
  const value =
    activeId !== null
      ? items.findIndex(({ id }) => id === parseInt(activeId as unknown as string))
      : null

  return (
    <div className={ClassName}>
      <ReactSpeedometer
        key={`${theme} ${items.map(({ color }) => color).join(' ')}`}
        value={value !== null ? value + 0.2 : 0}
        minValue={0}
        segmentColors={colors}
        maxValue={items.length}
        segments={items.length}
        textColor="transparent"
        width={265}
        height={152}
        needleColor={theme === 'light' ? '#0a2174' : '#FFF'}
        needleHeightRatio={0.8}
        needleTransitionDuration={400}
        ringWidth={15}
        needleTransition={Transition.easeLinear}
      />

      {label && <div className="speedometer__label">{label}</div>}
    </div>
  )
}

export const MemoSpeedometer = memo(Speedometer)
