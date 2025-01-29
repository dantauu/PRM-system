import { communication } from '@/shared/api';
import { $$app } from '@/shared/effector'
import { createHistoryRouter, createRoute, createRouterControls } from 'atomic-router'
import { sample } from 'effector'
import { createBrowserHistory } from 'history'

export const routes = {
  landing: createRoute(),
  landingRef: createRoute<{ login: string }>(),

  auth: {
    login: createRoute(),
    registration: createRoute(),
    resetPassword: createRoute(),
  },

  account: {
    main: createRoute(),
    finance: createRoute(),
    team: createRoute(),
    contact: {
      items: createRoute(),
      edit: createRoute<{ contactId: number }>(),
      work: createRoute<{ id: number }>(),
    },
    marketplace: createRoute(),
    communication: createRoute(),
    strategy: {
      items: createRoute(),
      edit: createRoute(),
    },
    profile: createRoute(),
    administration: createRoute(),
  },
}

export const controls = createRouterControls()

export const router = createHistoryRouter({
  routes: [
    { path: '/', route: routes.landing },
    { path: '/ref/:login', route: routes.landingRef },

    { path: '/auth/login', route: routes.auth.login },
    { path: '/auth/registration', route: routes.auth.registration },
    { path: '/auth/reset-password', route: routes.auth.resetPassword },

    { path: '/account', route: routes.account.main },
    { path: '/account/finance', route: routes.account.finance },
    { path: '/account/team', route: routes.account.team },
    { path: '/account/contact', route: routes.account.contact.items },
    { path: '/account/contact/:contactId/edit', route: routes.account.contact.edit },
    { path: '/account/contact/:id/work', route: routes.account.contact.work },
    { path: '/account/marketplace', route: routes.account.marketplace },
    { path: '/account/communication', route: routes.account.communication },
    { path: '/account/strategy', route: routes.account.strategy.items },
    { path: '/account/strategy/edit', route: routes.account.strategy.edit },
    { path: '/account/profile', route: routes.account.profile },
    { path: '/account/administration', route: routes.account.administration},
  ],
  controls,
})

sample({
  clock: $$app.started,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
})
