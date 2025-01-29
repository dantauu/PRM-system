import { contact } from './contact'
import { FinanceRoute } from './finance'
import { MainRoute } from './main'
import { MarketplaceRoute } from './market-place'
import { ProfileRoute } from './profile'
import { strategy } from './strategy'
import { TeamRoute } from './team'
import { AdministrationRoute } from './administration'
import { CommunicationRoute } from './communication'

export const account = [
  MainRoute,
  FinanceRoute,
  TeamRoute,
  ...contact,
  MarketplaceRoute,
  CommunicationRoute,
  ...strategy,
  ProfileRoute,
  AdministrationRoute
]
