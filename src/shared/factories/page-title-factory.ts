import { $$app } from '../effector'
import { RouteInstance, RouteParams } from 'atomic-router'
import { sample } from 'effector'

interface PageTitleFactoryParams {
  title: string
  route: RouteInstance<RouteParams>
}

export function PageTitleFactory({ title, route }: PageTitleFactoryParams) {
  sample({
    clock: route.opened,
    fn: () => title,
    target: $$app.pageTitleChanged,
  })
}
