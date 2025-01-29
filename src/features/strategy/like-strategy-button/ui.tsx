import './style.scss'
import { LikeFillIcon, LikeOutlineIcon } from '@/shared/assets'
import classNames from 'classnames'
import { FC, memo, useCallback, useState } from 'react'

interface LikeStrategyButtonProps {
  className?: string
}

export const LikeStrategyButton: FC<LikeStrategyButtonProps> = ({ className }) => {
  // State
  const [liked, setLiked] = useState(false)

  // Variables
  const ClassName = classNames('like-strategy-button', className)
  const Icon = liked ? LikeFillIcon : LikeOutlineIcon

  // Handlers
  const handleClick = useCallback(() => setLiked((prev) => !prev), [])

  return (
    <div
      className={ClassName}
      onClick={handleClick}
    >
      <Icon
        width={32}
        height={32}
      />
    </div>
  )
}

export const MemoLikeStrategyButton = memo(LikeStrategyButton)
