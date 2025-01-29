import {
  Contact,
  CustomStrategy,
  CustomStrategyStatus,
  CustomStrategyStep,
  CustomStrategyStepResult,
} from '@/shared/api'

export type DCustomStrategyStatus = CustomStrategyStatus

export interface DCustomStrategyStepResult extends CustomStrategyStepResult {
  status: DCustomStrategyStatus
}

export interface DCustomStrategyStep extends CustomStrategyStep {
  results: DCustomStrategyStepResult[]
}

export interface DCustomStrategyContact extends Contact {
  status: DCustomStrategyStatus
}

export interface DCustomStrategy extends CustomStrategy {
  steps: DCustomStrategyStep[]
  statuses: DCustomStrategyStatus[]
  contacts: DCustomStrategyContact[]
}
