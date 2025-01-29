/* eslint-disable react/display-name */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageLayout } from '@/shared/components'
import { LazyExoticComponent, ReactNode, Suspense } from 'react'

export const suspenseWrapper =
  (Lazy: LazyExoticComponent<any>, loader: ReactNode = <PageLayout.Loader />) =>
  () => (
    <Suspense fallback={loader}>
      <Lazy />
    </Suspense>
  )
