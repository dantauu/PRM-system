import './style.scss'
import { MemoSkeletonButton, PageLayout } from '@/shared/components'
import Skeleton from 'react-loading-skeleton'

export const SkeletonFinances = () => {
  return (
    <PageLayout.Cloud
      contentClassName="finances"
      header={{
        title: 'Финансы',
        subtitle: 'Покажи на что ты способен!',
      }}
    >
      <div className="finances__text">
        <Skeleton
          className="finances__value"
          width={100}
        />
        <Skeleton
          className="finances__title"
          width={65}
        />
      </div>
      <div className="finances__buttons">
        <MemoSkeletonButton />
      </div>
    </PageLayout.Cloud>
  )
}
