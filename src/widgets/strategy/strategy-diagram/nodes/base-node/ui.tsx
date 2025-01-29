import './style.scss'
import { Port } from 'beautiful-react-diagrams/@types/DiagramSchema'
import classNames from 'classnames'
import { FC, ReactNode, cloneElement, memo, useMemo } from 'react'

interface BaseNodeProps {
  className?: string
  width: number
  height: number

  title: ReactNode

  children?: ReactNode
  inputPort?: Port
  outputPort?: Port

  onClick?: () => void
}

export const BaseNode: FC<BaseNodeProps> = ({
  className,
  width,
  height,
  title,
  children,
  inputPort,
  outputPort,
  onClick,
}) => {
  // Variables
  const ClassName = classNames('base-node', className)
  const style = useMemo(
    () => ({
      width: width,
      height: height,
    }),
    [height, width]
  )

  return (
    <div
      className={ClassName}
      style={style}
      onClick={onClick}
    >
      <div className="base-node__header">{title}</div>
      {children}
      <div className="base-node__ports">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        {inputPort && <div className="base-node__input">{cloneElement(inputPort)}</div>}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        {outputPort && <div className="base-node__output">{cloneElement(outputPort)}</div>}
      </div>
    </div>
  )
}

export const MemoBaseNode = memo(BaseNode)
