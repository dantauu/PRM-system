import { HeadType } from '../../types'
import './style.scss'
import classNames from 'classnames'
import { memo } from 'react'

interface HeadProps<Entity> extends HeadType<Entity> {
  className?: string

  showEdit?: boolean
}

export const Head = <Entity,>({ className, columns, showEdit }: HeadProps<Entity>) => {
  // Variables
  const ClassName = classNames('head', className)

  return (
    <div className={ClassName}>
      {columns.map(({ title }, index) => (
        <div
          key={index}
          className="head__item"
        >
          {title}
        </div>
      ))}

      {showEdit && <div className="head__item head__item--edit">Редактировать</div>}
    </div>
  )
}

export const MemoHead = memo(Head)
