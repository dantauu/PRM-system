import './style.scss'
import { MemoSkeletonButton, PageLayout } from '@/shared/components'
import Skeleton from 'react-loading-skeleton'

export const SkeletonYourPotentialIncome = () => {
  return (
    <PageLayout.Cloud
      contentClassName="your-potential-income"
      header={{
        title: 'Ваш потенциальный доход',
        subtitle: 'Покажи на что ты способен!',
      }}
    >
      <div className="your-potential-income__text">
        <Skeleton
          className="your-potential-income__value"
          width={200}
        />
        <Skeleton
          className="your-potential-income__title"
          width={120}
        />
      </div>
      <div className="your-potential-income__buttons">
        <MemoSkeletonButton />
      </div>
    </PageLayout.Cloud>
  )
}
