import { RowType } from '../../types'
import './style.scss'
import classNames from 'classnames'
import { MouseEvent, memo } from 'react'

interface RowProps<Entity> extends RowType<Entity> {
  className?: string

  onClick?: (item: Entity) => void
  onEdit?: (item: Entity) => void
}

export const Row = <Entity,>({ className, columns, entity, onClick, onEdit }: RowProps<Entity>) => {
  // Variables
  const ClassName = classNames('table-row', { 'table-row--clickable': onClick }, className)

  // Utils
  const getValue = ({ name, compute }: (typeof columns)[number]) => {
    if (compute) {
      return compute(entity)
    }

    if (typeof entity === 'object' && entity && Object.keys(entity).includes(name as string)) {
      return entity[name as keyof typeof entity]
    }

    return '-'
  }

  // Handler
  const handleClick = () => {
    onClick?.(entity)
  }

  const handleEdit = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    onEdit?.(entity)
  }

  return (
    <div
      className={ClassName}
      onClick={handleClick}
    >
      {columns.map((column, index) => (
        <div
          key={index}
          className="table-row__item"
        >
          {getValue(column) as string}
        </div>
      ))}

      {onEdit && (
        <div
          className="table-row__item table-row__item--edit"
          onClick={handleEdit}
        >
          Редактировать
        </div>
      )}
    </div>
  )
}

export const MemoRow = memo(Row)
