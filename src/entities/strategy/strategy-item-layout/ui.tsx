import './style.scss'
import DefaultStrategyImage from '@/shared/assets/images/default-strategy-image.png'
import classNames from 'classnames'
import { FC, ReactNode, memo } from 'react'

interface StrategyItemLayoutProps {
  className?: string

  image?: string
  title: string
  subtitle: string

  likeButtonSlot?: ReactNode
  leftButtonSlot?: ReactNode
  rightButtonSlot?: ReactNode
}

export const StrategyItemLayout: FC<StrategyItemLayoutProps> = ({
  className,
  image,
  title,
  subtitle,
  likeButtonSlot,
  leftButtonSlot,
  rightButtonSlot,
}) => {
  // Variables
  const ClassName = classNames('strategy-item-layout', className)

  return (
    <div className={ClassName}>
      <div className="strategy-item-layout__like-button">{likeButtonSlot}</div>
      <img
        src={image || DefaultStrategyImage}
        className="strategy-item-layout__image"
      />
      <div className="strategy-item-layout__text">
        <div className="strategy-item-layout__title">{title}</div>
        <div className="strategy-item-layout__subtitle">{subtitle}</div>
      </div>
      <div className="strategy-item-layout__buttons">
        <div className="strategy-item-layout__left-button">{leftButtonSlot}</div>
        <div className="strategy-item-layout__right-button">{rightButtonSlot}</div>
      </div>
    </div>
  )
}

export const MemoStrategyItemLayout = memo(StrategyItemLayout)
