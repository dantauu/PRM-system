import './App.css'
import { Pages } from '@/pages'
import { Alerts } from '@/shared/components'
import ModalCommunication from '@/shared/components/popup/modal-communication'
import ModalContact from '@/shared/components/popup/modal-contact'
import ModalFinance from '@/shared/components/popup/modal-finance'
import ModalIncomeCalculation from '@/shared/components/popup/modal-income-calculation'
import ModalLastContact from '@/shared/components/popup/modal-lastContact'
import { ModalLotteryTickets } from '@/shared/components/popup/modal-lottery-tickets'
import { ModalPromocode } from '@/shared/components/popup/modal-promocode'
import { ModalWelcome } from '@/shared/components/popup/modal-welcome'
import { SidebarProvider } from '@/shared/hooks'
import { router } from '@/shared/router'
import { ThemeProvider, useTheme } from '@/shared/theme'
import { RouterProvider } from 'atomic-router-react'
import { ReactNode } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

function SkeletonThemeProvider({ children }: { children: ReactNode }) {
  // Hooks
  const { theme } = useTheme()

  return (
    <SkeletonTheme
      baseColor={theme === 'light' ? '#ebebeb' : '#1B254B'}
      highlightColor={theme === 'light' ? '#f5f5f5' : '#262F53'}
    >
      {children}
    </SkeletonTheme>
  )
}

export function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <SkeletonThemeProvider>
          <RouterProvider router={router}>
            <Pages />
          </RouterProvider>
          <Alerts />
          <ModalFinance />
          <ModalLastContact />
          <ModalContact />
          <ModalIncomeCalculation />
          <ModalPromocode />
          <ModalLotteryTickets />
          <ModalCommunication />
        </SkeletonThemeProvider>
      </SidebarProvider>
    </ThemeProvider>
  )
}
