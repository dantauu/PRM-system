import './style.scss'
import DefaultActivityImage from '@/shared/assets/images/default-activity-image.png'
import classNames from 'classnames'
import { FC, ReactNode, memo } from 'react'

interface ActivityItemLayoutProps {
  className?: string

  image?: string
  title: string
  rightTitle?: string
  subtitle: string

  likeButtonSlot?: ReactNode
  leftButtonSlot?: ReactNode
  rightButtonSlot?: ReactNode
}

export const ActivityItemLayout: FC<ActivityItemLayoutProps> = ({
  className,
  image,
  title,
  rightTitle,
  subtitle,
  likeButtonSlot,
  leftButtonSlot,
  rightButtonSlot,
}) => {
  // Variables
  const ClassName = classNames('activity-item-layout', className)

  return (
    <div className={ClassName}>
      <div className="activity-item-layout__like-button">{likeButtonSlot}</div>
      <img
        src={image || DefaultActivityImage}
        className="activity-item-layout__image"
      />
      <div className="activity-item-layout__text">
        <div className="activity-item-layout__title">
          <div className="activity-item-layout__title-left">{title}</div>
          <div className="activity-item-layout__title-right">{rightTitle}</div>
        </div>
        <div className="activity-item-layout__subtitle">{subtitle}</div>
      </div>
      <div className="activity-item-layout__buttons">
        <div className="activity-item-layout__left-button">{leftButtonSlot}</div>
        <div className="activity-item-layout__right-button">{rightButtonSlot}</div>
      </div>
    </div>
  )
}

export const MemoActivityItemLayout = memo(ActivityItemLayout)
