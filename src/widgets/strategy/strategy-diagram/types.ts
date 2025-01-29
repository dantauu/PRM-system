import { CustomStrategyStatus, CustomStrategyStep, CustomStrategyStepResult } from '@/shared/api'
import { Node } from 'beautiful-react-diagrams/@types/DiagramSchema'
import { ElementType, ReactNode } from 'react'

export type MyCoordinates = [number, number]

export type LinksTreeStatusName = `status-${number}`
export type LinksTreeStepName = `step-${number}`
export type LinksTreeStepResultName = `step-result-${number}`
export type LinksTreeName = LinksTreeStatusName | LinksTreeStepName | LinksTreeStepResultName

export type LinksTreeType = 'step' | 'step-result' | 'status'

export type NodeComponent<Data> = (
  props: Omit<Node<Data>, 'coordinates'>
) => ElementType | ReactNode

type MyNode<Id, T extends LinksTreeType, Data> = Omit<Node<Data>, 'content'> & {
  id: Id
  linksTreeType: T
  render: NodeComponent<Data>
}

export type StatusNode = MyNode<LinksTreeStatusName, 'status', CustomStrategyStatus>

export type StepNode = MyNode<LinksTreeStepName, 'step', CustomStrategyStep>

export type StepResultNode = MyNode<
  LinksTreeStepResultName,
  'step-result',
  CustomStrategyStepResult
>

export type LinksTree<T extends LinksTreeType> = {
  name: LinksTreeName
  type: LinksTreeType
  node: T extends 'step' ? StepNode : T extends 'step-result' ? StepResultNode : StatusNode
  children: LinksTree<
    T extends 'step' ? 'step-result' : T extends 'step-result' ? 'status' : 'step'
  >[]
  coordinates: MyCoordinates
}
