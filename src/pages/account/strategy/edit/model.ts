import { PageTitleFactory } from '@/shared/factories'
import { routes } from '@/shared/router'
import { $$editStrategyModal } from '@/widgets/strategy/edit-strategy-form/model'
import { sample } from 'effector'

export const currentRoute = routes.account.strategy.edit

PageTitleFactory({
  title: 'Редактор стратегий',
  route: currentRoute,
})

sample({
  clock: currentRoute.opened,
  target: $$editStrategyModal.opened,
})
