import {
  DCustomStrategy,
  DCustomStrategyContact,
  DCustomStrategyStatus,
  DCustomStrategyStep,
  DCustomStrategyStepResult,
} from './types'
import {
  ContactCustomStrategyStatus,
  CustomStrategy,
  CustomStrategyStatus,
  CustomStrategyStep,
  CustomStrategyStepResult,
} from '@/shared/api'

// Status
interface DCustomStrategyStatusFactoryParams {
  status: CustomStrategyStatus
}

export function DCustomStrategyStatusFactory({
  status,
}: DCustomStrategyStatusFactoryParams): DCustomStrategyStatus {
  return {
    ...status,
  }
}

// Result
interface DCustomStrategyStepResultFactoryParams {
  result: CustomStrategyStepResult
  status: DCustomStrategyStatus
}

export function DCustomStrategyStepResultFactory({
  result,
  status,
}: DCustomStrategyStepResultFactoryParams): DCustomStrategyStepResult {
  return {
    ...result,
    status,
  }
}

// Step
interface DCustomStrategyStepFactoryParams {
  step: CustomStrategyStep
  results: DCustomStrategyStepResult[]
}

export function DCustomStrategyStepFactory({
  step,
  results,
}: DCustomStrategyStepFactoryParams): DCustomStrategyStep {
  return {
    ...step,
    results,
  }
}

export function DCustomStrategyContactFactory({
  contact_id,
  custom_strategy_status_id,
}: ContactCustomStrategyStatus): DCustomStrategyContact {
  return {
    ...contact_id,
    status: custom_strategy_status_id,
  }
}

// Strategy
interface DCustomStrategyFactoryParams {
  strategy: CustomStrategy
  steps: DCustomStrategyStep[]
  statuses: DCustomStrategyStatus[]
  contacts: DCustomStrategyContact[]
}

export function DCustomStrategyFactory({
  strategy,
  steps,
  statuses,
  contacts,
}: DCustomStrategyFactoryParams): DCustomStrategy {
  return {
    ...strategy,
    steps,
    statuses,
    contacts,
  }
}
