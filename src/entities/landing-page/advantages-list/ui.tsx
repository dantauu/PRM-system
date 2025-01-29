import './style.scss'
import AdvantagesItem from '@/types/AdvantagesItem'
import classNames from 'classnames'
import { FC } from 'react'

interface AdvantagesListProps {
  className?: string

  items: AdvantagesItem[]

  noBoard?: boolean
}

export const AdvantagesList: FC<AdvantagesListProps> = ({ className, items, noBoard }) => {
  // Varaibles
  const ClassName = classNames(
    'advantages-list',
    { 'advantages-list--no-board': noBoard },
    className
  )
  return (
    <div className={ClassName}>
      {items.map((advantage) => (
        <div
          key={advantage.id}
          className="advantages-list__item"
        >
          <div className={classNames('advantages-list__item-image', advantage.imageClassName)}>
            <img
              src={advantage.image}
              alt="Advantage Image"
            />
          </div>
          <div className="advantages-list__item-content">
            <div className="advantages-list__item-title">{advantage.title}</div>
            <div className="advantages-list__item-text">{advantage.text}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
