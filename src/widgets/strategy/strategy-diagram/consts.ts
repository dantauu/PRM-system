import { LinksTreeType } from './types'

export const NODE_SPACING = 40

export const STATUS_NODE_WIDTH = 200
export const STATUS_NODE_HEIGHT = 100

export const STEP_NODE_WIDTH = 200
export const STEP_NODE_HEIGHT = 100

export const STEP_RESULT_NODE_WIDTH = 200
export const STEP_RESULT_NODE_HEIGHT = 100

export const NODE_WIDTHS: Record<LinksTreeType, number> = {
  status: STATUS_NODE_WIDTH,
  step: STEP_NODE_WIDTH,
  'step-result': STEP_RESULT_NODE_WIDTH,
}

export const NODE_HEIGHTS: Record<LinksTreeType, number> = {
  status: STATUS_NODE_HEIGHT,
  step: STEP_NODE_HEIGHT,
  'step-result': STEP_RESULT_NODE_HEIGHT,
}
