//import { SkeletonYourPotentialIncome } from './skeleton'
import './style.scss'
import { MemoActiveStrategySelect } from '@/features/strategy'
import { MemoButton, PageLayout } from '@/shared/components'
import { $$PotentialIncome, $$activeStrategy, $$basicStrategy } from '@/shared/effector'
import { $$ModalIncomeCalculation } from '@/shared/effector/finance/modal-income-calculation'
import { useUnit } from 'effector-react'
import { useEffect, useLayoutEffect } from 'react'

export const YourPotentialIncome = () => {
  const [openModal, spacedValue] = useUnit([
    $$ModalIncomeCalculation.openModal,
    $$PotentialIncome.$spacedValue,
  ])

  const [items, submited] = useUnit([
    $$basicStrategy.getAll.$items,
    $$basicStrategy.getAll.submited,
  ])

  const [strategyId] = useUnit([$$activeStrategy.$activeStrategyId])
  const [strategyIdChanged] = useUnit([$$PotentialIncome.strategyIdChanged])

  useLayoutEffect(() => submited(), [submited])

  useEffect(() => {
    strategyIdChanged(strategyId)
  }, [strategyId, strategyIdChanged])

  // Render
  //if (pending) {
  //  return <SkeletonYourPotentialIncome />
  //}
  return (
    <PageLayout.Cloud
      contentClassName="your-potential-income"
      header={{
        title: 'Ваш потенциальный доход',
        subtitle: 'Покажи на что ты способен!',
        right: <MemoActiveStrategySelect className="your-potential-income__select" />,
      }}
    >
      <div className="your-potential-income__text">
        <div className="your-potential-income__value">$ {spacedValue}</div>
        <div className="your-potential-income__title">Потенциальный доход</div>
      </div>
      <div className="your-potential-income__buttons">
        <MemoButton onClick={openModal}>Полный расчет потенциального дохода</MemoButton>
      </div>
    </PageLayout.Cloud>
  )
}
