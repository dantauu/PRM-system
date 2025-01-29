import {
  NODE_SPACING,
  STATUS_NODE_HEIGHT,
  STATUS_NODE_WIDTH,
  STEP_NODE_HEIGHT,
  STEP_NODE_WIDTH,
  STEP_RESULT_NODE_HEIGHT,
  STEP_RESULT_NODE_WIDTH,
} from './consts'
import { BaseNode } from './nodes'
import './style.scss'
import { Diagram, createSchema, useSchema } from 'beautiful-react-diagrams'
import 'beautiful-react-diagrams/styles.css'
import classNames from 'classnames'
import { CSSProperties, FC, memo } from 'react'
import Skeleton from 'react-loading-skeleton'

interface StrategyDiagramProps {
  className?: string
}

const initialSchema = createSchema({
  nodes: [
    {
      id: 'node-1',
      content: 'Node 1',
      disableDrag: true,
      render: () => (
        <BaseNode
          title={<Skeleton />}
          width={STATUS_NODE_WIDTH}
          height={STATUS_NODE_HEIGHT}
        >
          <Skeleton
            containerClassName="skeleton-node__info"
            className="skeleton-node__name"
            width={80}
          />
        </BaseNode>
      ),
      coordinates: [NODE_SPACING, NODE_SPACING],
    },
    {
      id: 'node-2',
      content: 'Node 2',
      disableDrag: true,
      render: () => (
        <BaseNode
          title={<Skeleton />}
          width={STEP_NODE_WIDTH}
          height={STEP_NODE_HEIGHT}
        >
          <Skeleton
            containerClassName="skeleton-node__info"
            className="skeleton-node__name"
            width={120}
          />
        </BaseNode>
      ),
      coordinates: [NODE_SPACING * 2 + STATUS_NODE_WIDTH, NODE_SPACING],
    },
    {
      id: 'node-3',
      content: 'Node 3',
      disableDrag: true,
      render: () => (
        <BaseNode
          title={<Skeleton />}
          width={STEP_RESULT_NODE_WIDTH}
          height={STEP_RESULT_NODE_HEIGHT}
        >
          <Skeleton
            containerClassName="skeleton-node__info"
            className="skeleton-node__name"
            width={110}
          />
        </BaseNode>
      ),
      coordinates: [NODE_SPACING * 3 + STATUS_NODE_WIDTH + STEP_NODE_WIDTH, NODE_SPACING],
    },
  ],
})

const style = {
  '--diagram-height': `${NODE_SPACING * 2 + STATUS_NODE_HEIGHT}px`,
} as CSSProperties

export const StrategyDiagram: FC<StrategyDiagramProps> = ({ className }) => {
  // Schema
  const [schema] = useSchema(initialSchema)

  // Variables
  const ClassName = classNames('strategy-diagram', 'strategy-diagram--skeleton', className)

  return (
    <div
      className={ClassName}
      style={style}
    >
      <Diagram schema={schema} />
    </div>
  )
}

export const SkeletonStrategyDiagram = memo(StrategyDiagram)
