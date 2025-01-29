import './style.scss'
import classNames from 'classnames'
import { ReactNode, memo } from 'react'

interface HorizontalScrollableItemsProps<Item> {
  className?: string

  title: string
  rightHeaderSlot?: ReactNode

  items: Item[]
  renderItem: (item: Item) => ReactNode
}

export const HorizontalScrollableItems = <Item,>({
  className,
  title,
  rightHeaderSlot,
  items,
  renderItem,
}: HorizontalScrollableItemsProps<Item>) => {
  // Variables
  const ClassName = classNames('horizontal-scrollable-items', className)

  return (
    <div className={ClassName}>
      <div className="horizontal-scrollable-items__header">
        <div className="horizontal-scrollable-items__left">
          <div className="horizontal-scrollable-items__title">{title}</div>
        </div>
        {rightHeaderSlot && (
          <div className="horizontal-scrollable-items__right">{rightHeaderSlot}</div>
        )}
      </div>

      <div className="horizontal-scrollable-items__cotnent">
        <div className="horizontal-scrollable-items__items">{items.map(renderItem)}</div>
      </div>
    </div>
  )
}

export const MemoHorizontalScrollableItems = memo(HorizontalScrollableItems)
