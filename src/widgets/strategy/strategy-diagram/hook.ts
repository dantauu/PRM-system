import { strategy } from './../../../pages/account/strategy/index';
import { NODE_HEIGHTS, NODE_SPACING, NODE_WIDTHS } from './consts'
import { StatusNode, StepNode, StepResultNode } from './nodes'
import { linksTreeFactory, linksTreeToLinks, linksTreeToNodes } from './utils'
import { $$activeStrategy } from '@/shared/effector'
import { createSchema, useSchema } from 'beautiful-react-diagrams'
import { useUnit } from 'effector-react'
import { useEffect, useMemo } from 'react'

export const useStrategyDiagram = () => {
  // Effector
  const [steps, stepResults, statuses] = useUnit([
    $$activeStrategy.$steps,
    $$activeStrategy.$stepResults,
    $$activeStrategy.$statuses,
  ])

  // console.log("statuses statuses statuses", statuses)
  // console.log("steps", steps)
  // console.log("stepResults", stepResults)

  const requestStatuses = useUnit([
    $$activeStrategy.$stepsStatus,
    $$activeStrategy.$stepResultsStatus,
    $$activeStrategy.$statusesStatus,
  ])

// const [strategy] = useUnit([$$activeStrategy.$strategy])
// console.log("activeStrategy", strategy)

  // Variables
  const pending = requestStatuses.some((status) => status === 'pending')

  // Memo
  const linksTree = useMemo(() => {
    if (pending) {
      return null
    }

    return linksTreeFactory(
      statuses[0],
      steps,
      stepResults,
      statuses,
      StatusNode,
      StepNode,
      StepResultNode
    )
  }, [pending, statuses, stepResults, steps])

  const nodes = useMemo(() => (linksTree ? linksTreeToNodes(linksTree) : []), [linksTree])
  const links = useMemo(() => (linksTree ? linksTreeToLinks(linksTree) : []), [linksTree])
  const [maxWidth, maxHeight] = useMemo(() => {
    let maxWidth = 0
    let maxHeight = 0
    nodes.forEach((node) => {
      maxWidth = Math.max(
        maxWidth,
        node.coordinates[0] + NODE_SPACING + NODE_WIDTHS[node.linksTreeType]
      )
      maxHeight = Math.max(
        maxHeight,
        node.coordinates[1] + NODE_SPACING + NODE_HEIGHTS[node.linksTreeType]
      )
    })

    return [maxWidth, maxHeight]
  }, [nodes])

  const innerSchema = useMemo(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    () => (pending ? createSchema({ nodes: [], links: [] }) : createSchema({ nodes, links })),
    [links, nodes, pending]
  )

  const [schema, { onChange }] = useSchema(innerSchema)

  useEffect(() => {
    onChange(innerSchema)
  }, [innerSchema, onChange])

  return {
    schema,
    pending,
    maxWidth,
    linksCount: links.length,
    maxHeight,
  }
}
