import './style.scss'
import { ChevronDownIcon, ChevronUpIcon } from '@/shared/assets'
import classNames from 'classnames'
import { FC, memo } from 'react'

interface SortButtonProps {
  className?: string

  sort?: 'ASC' | 'DESC'
}

const getColor = (active: boolean) =>
  active ? 'var(--text-color-three)' : 'var(--nav-list-disable)'

export const SortButton: FC<SortButtonProps> = ({ className, sort }) => {
  // Variables
  const ClassName = classNames('sort-button', className)

  // Render
  const renderUp = () => (
    <ChevronUpIcon
      className="sort-button__up"
      color={getColor(sort === 'ASC')}
    />
  )
  const renderDown = () => (
    <ChevronDownIcon
      className="sort-button__down"
      color={getColor(sort === 'DESC')}
    />
  )

  return (
    <div className={ClassName}>
      {renderUp()}
      {renderDown()}
    </div>
  )
}

export const MemoSortButton = memo(SortButton)
