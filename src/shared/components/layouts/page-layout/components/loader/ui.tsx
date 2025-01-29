import './style.scss'
import classNames from 'classnames'
import { FC, memo } from 'react'
import { Spinner } from 'react-bootstrap'

interface LoaderProps {
  className?: string
}

export const Loader: FC<LoaderProps> = ({ className }) => {
  // Variables
  const ClassName = classNames('loader', className)

  return (
    <div className={ClassName}>
      <Spinner />
    </div>
  )
}

export const MemoLoader = memo(Loader)
