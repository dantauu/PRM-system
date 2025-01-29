import {
  NODE_SPACING,
  STATUS_NODE_WIDTH,
  STEP_NODE_WIDTH,
  STEP_RESULT_NODE_HEIGHT,
  STEP_RESULT_NODE_WIDTH,
} from './consts'
import {
  LinksTree,
  LinksTreeStatusName,
  LinksTreeStepName,
  LinksTreeStepResultName,
  LinksTreeType,
  MyCoordinates,
  NodeComponent,
  StatusNode,
  StepNode,
  StepResultNode,
} from './types'
import { CustomStrategyStatus, CustomStrategyStep, CustomStrategyStepResult } from '@/shared/api'
import { Link } from 'beautiful-react-diagrams/@types/DiagramSchema'

//* Node Factories
export function statusNodeFactory(
  status: CustomStrategyStatus,
  coordinates: MyCoordinates,
  render: NodeComponent<CustomStrategyStatus>,
  hasInput: boolean = false,
  hasOutput: boolean = false
): StatusNode {
  const id: LinksTreeStatusName = `status-${status.custom_strategy_status_id}`

  return {
    id,
    disableDrag: true,
    data: status,
    coordinates,
    render,
    inputs: hasInput ? [{ id: `input-${id}`, alignment: 'left' }] : undefined,
    outputs: hasOutput ? [{ id: `output-${id}`, alignment: 'right' }] : undefined,
    linksTreeType: 'status',
  }
}

export function stepNodeFactory(
  step: CustomStrategyStep,
  coordinates: MyCoordinates,
  render: NodeComponent<CustomStrategyStep>,
  hasInput: boolean = false,
  hasOutput: boolean = false
): StepNode {
  const id: LinksTreeStepName = `step-${step.custom_strategy_step_id}`

  return {
    id,
    disableDrag: true,
    data: step,
    coordinates,
    render,
    inputs: hasInput ? [{ id: `input-${id}`, alignment: 'left' }] : undefined,
    outputs: hasOutput ? [{ id: `output-${id}`, alignment: 'right' }] : undefined,
    linksTreeType: 'step',
  }
}

export function stepResultNodeFactory(
  stepResult: CustomStrategyStepResult,
  coordinates: MyCoordinates,
  render: NodeComponent<CustomStrategyStepResult>,
  hasInput: boolean = false,
  hasOutput: boolean = false
): StepResultNode {
  const id: LinksTreeStepResultName = `step-result-${stepResult.custom_strategy_step_result_id}`

  return {
    id,
    disableDrag: true,
    data: stepResult,
    coordinates,
    render,
    inputs: hasInput ? [{ id: `input-${id}`, alignment: 'left' }] : undefined,
    outputs: hasOutput ? [{ id: `output-${id}`, alignment: 'right' }] : undefined,
    linksTreeType: 'step-result',
  }
}

//* Links Tree Factories
function statusLinkFactory(
  status: CustomStrategyStatus,
  steps: CustomStrategyStep[],
  stepResults: CustomStrategyStepResult[],
  statuses: CustomStrategyStatus[],
  coordinates: MyCoordinates,
  StatusNode: NodeComponent<CustomStrategyStatus>,
  StepNode: NodeComponent<CustomStrategyStep>,
  StepResultNode: NodeComponent<CustomStrategyStepResult>,
  hasInput: boolean = false
): LinksTree<'status'> {
  const [x, y] = coordinates

  const children = status.custom_strategy_next_step_id
    ? [
        stepLinkFactory(
          steps.find(
            (step) => step.custom_strategy_step_id === status.custom_strategy_next_step_id
          ),
          steps,
          stepResults,
          statuses,
          [x + NODE_SPACING + STATUS_NODE_WIDTH, y],
          StatusNode,
          StepNode,
          StepResultNode,
          true
        ),
      ]
    : []

  return {
    name: `status-${status.custom_strategy_status_id}`,
    type: 'status',
    node: statusNodeFactory(status, coordinates, StatusNode, hasInput, Boolean(children.length)),
    children,
    coordinates,
  }
}

function stepLinkFactory(
  step: CustomStrategyStep,
  steps: CustomStrategyStep[],
  stepResults: CustomStrategyStepResult[],
  statuses: CustomStrategyStatus[],
  coordinates: MyCoordinates,
  StatusNode: NodeComponent<CustomStrategyStatus>,
  StepNode: NodeComponent<CustomStrategyStep>,
  StepResultNode: NodeComponent<CustomStrategyStepResult>,
  hasInput: boolean = false
): LinksTree<'step'> {
  const [x, y] = coordinates

  const children = stepResults
    .filter((result) => result.custom_strategy_step_id === step.custom_strategy_step_id)
    .map((stepResult, index) =>
      stepResultLinkFactory(
        stepResult,
        steps,
        stepResults,
        statuses,
        [x + NODE_SPACING + STEP_NODE_WIDTH, y + index * (NODE_SPACING + STEP_RESULT_NODE_HEIGHT)],
        StatusNode,
        StepNode,
        StepResultNode,
        true
      )
    )

  return {
    name: `step-${step.custom_strategy_step_id}`,
    type: 'step',
    node: stepNodeFactory(step, coordinates, StepNode, hasInput, Boolean(children.length)),
    children,
    coordinates,
  }
}

function stepResultLinkFactory(
  stepResult: CustomStrategyStepResult,
  steps: CustomStrategyStep[],
  stepResults: CustomStrategyStepResult[],
  statuses: CustomStrategyStatus[],
  coordinates: MyCoordinates,
  StatusNode: NodeComponent<CustomStrategyStatus>,
  StepNode: NodeComponent<CustomStrategyStep>,
  StepResultNode: NodeComponent<CustomStrategyStepResult>,
  hasInput: boolean = false
): LinksTree<'step-result'> {
  const [x, y] = coordinates

  return {
    name: `step-result-${stepResult.custom_strategy_step_result_id}`,
    type: 'step-result',
    node: stepResultNodeFactory(stepResult, coordinates, StepResultNode, hasInput, true),
    children: [
      statusLinkFactory(
        statuses.find(
          (status) => status.custom_strategy_status_id === stepResult.custom_strategy_status_id
        ),
        steps,
        stepResults,
        statuses,
        [x + NODE_SPACING + STEP_RESULT_NODE_WIDTH, y],
        StatusNode,
        StepNode,
        StepResultNode,
        true
      ),
    ],
    coordinates,
  }
}

export const linksTreeFactory = (
  initialStatus: CustomStrategyStatus,
  steps: CustomStrategyStep[],
  stepResults: CustomStrategyStepResult[],
  statuses: CustomStrategyStatus[],
  StatusNode: NodeComponent<CustomStrategyStatus>,
  StepNode: NodeComponent<CustomStrategyStep>,
  StepResultNode: NodeComponent<CustomStrategyStepResult>
) => {
  return statusLinkFactory(
    initialStatus,
    steps,
    stepResults,
    statuses,
    [NODE_SPACING, NODE_SPACING],
    StatusNode,
    StepNode,
    StepResultNode
  )
}

export function linksTreeToNodes<T extends LinksTreeType>(
  linksTree: LinksTree<T>
): Array<StatusNode | StepNode | StepResultNode> {
  return [linksTree.node, ...linksTree.children.flatMap((child) => linksTreeToNodes(child))]
}

export function linksTreeToLinks<T extends LinksTreeType>(linksTree: LinksTree<T>): Link[] {
  const links = linksTree.children.map((child) => ({
    input: `output-${linksTree.name}`,
    output: `input-${child.name}`,
  }))
  return [...links, ...linksTree.children.flatMap((child) => linksTreeToLinks(child))]
}
