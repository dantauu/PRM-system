import { SkeletonFinances } from './skeleton'
import './style.scss'
import { MemoButton, PageLayout } from '@/shared/components'
import { $$balance } from '@/shared/effector'
import { $isModalOpen, openModal } from '@/shared/effector/finance/modal-status'
import { useSpace } from '@/shared/hooks'
import { useUnit } from 'effector-react'

export const Finances = () => {
  // Effector
  const [value, pending] = useUnit([$$balance.$balance, $$balance.$pending])
  const [isOpenModal] = useUnit([$isModalOpen])

  // Hooks
  const spacedValue = useSpace(value)

  // Render
  if (pending) {
    return <SkeletonFinances />
  }

  return (
    <PageLayout.Cloud
      contentClassName="finances"
      header={{
        title: 'Финансы',
        subtitle: 'Покажи на что ты способен!',
      }}
    >
      <div className="finances__text">
        <div className="finances__value">$ {spacedValue}</div>
        <div className="finances__title">Ваш доход</div>
      </div>
      <div className="finances__buttons">
        <MemoButton onClick={openModal}>Заявка на вывод</MemoButton>
      </div>
    </PageLayout.Cloud>
  )
}
