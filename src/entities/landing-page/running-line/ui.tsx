import './style.scss'
import classNames from 'classnames'
import { FC, useMemo } from 'react'
import Marquee from 'react-fast-marquee'

interface RunningLineProps {
  className?: string

  text: string
  title?: React.ReactNode

  reverse?: boolean
  noOpacity?: boolean
}

export const RunningLine: FC<RunningLineProps> = ({
  className,
  text,
  title,
  reverse,
  noOpacity,
}) => {
  // Variables
  const ClassName = classNames(
    'running-line',
    {
      'running-line--reverse': reverse,
      'running-line--no-opacity': noOpacity,
    },
    className
  )

  // Memo
  const items = useMemo(() => new Array(8).fill(text), [text])

  return (
    <div className={ClassName}>
      <Marquee
        loop={0}
        className="running-line__marquee"
      >
        {items.map((text, index) => (
          <div
            key={index}
            className="running-line__item"
          >
            {text}
          </div>
        ))}
      </Marquee>

      {title && <div className="running-line__title">{title}</div>}
    </div>
  )
}
