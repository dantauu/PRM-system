import { Row } from './components'
import { Head } from './components/head'
import './style.scss'
import { TableType } from './types'
import classNames from 'classnames'
import { memo } from 'react'

interface TableProps<Entity> extends TableType<Entity> {
  className?: string
  keyField: keyof Entity

  onItemClick?: (item: Entity) => void
  onItemEdit?: (item: Entity) => void
}

export const Table = <Entity,>({
  className,
  keyField,

  columns,
  data,

  onItemClick,
  onItemEdit,
}: TableProps<Entity>) => {
  // Variables
  const ClassName = classNames('my-table', className)

  return (
    <div className={ClassName}>
      <Head
        columns={columns}
        showEdit={!!onItemEdit}
      />
      {data.map((item) => (
        <Row
          key={item[keyField] as string}
          columns={columns}
          entity={item}
          onClick={onItemClick}
          onEdit={onItemEdit}
        />
      ))}
    </div>
  )
}

export const MemoTable = memo(Table)
