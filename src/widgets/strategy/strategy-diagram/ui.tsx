import { useStrategyDiagram } from './hook'
import { SkeletonStrategyDiagram } from './skeleton'
import './style.scss'
import { Diagram } from 'beautiful-react-diagrams'
import 'beautiful-react-diagrams/styles.css'
import classNames from 'classnames'
import { CSSProperties, FC, memo, useMemo } from 'react'

interface StrategyDiagramProps {
  className?: string
}

export const StrategyDiagram: FC<StrategyDiagramProps> = ({ className }) => {
  // Schema
  const { schema, linksCount, pending, maxWidth, maxHeight } = useStrategyDiagram()

  // Variables
  const ClassName = classNames('strategy-diagram', className)
  const style = useMemo(
    () =>
      ({
        '--diagram-width': `${maxWidth}px`,
        '--diagram-height': `${maxHeight}px`,
      }) as CSSProperties,
    [maxHeight, maxWidth]
  )

  if (pending) {
    return <SkeletonStrategyDiagram className={ClassName} />
  }

  return (
    <div
      className={ClassName}
      style={style}
    >
      <Diagram
        key={linksCount}
        schema={schema}
      />
    </div>
  )
}

export const MemoStrategyDiagram = memo(StrategyDiagram)
