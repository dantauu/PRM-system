import './style.scss'
import { LevelUpContactButton } from '@/features/contact'
import { MemoActiveStrategySelect } from '@/features/strategy'
import { PageLayout } from '@/shared/components'
import classNames from 'classnames'
import { FC, memo } from 'react'

interface ChooseContactStrategyProps {
  className?: string
}

export const ChooseContactStrategy: FC<ChooseContactStrategyProps> = ({ className }) => {
  // Effector

  // Variables
  const ClassName = classNames('choose-contact-strategy', className)

  return (
    <PageLayout.Cloud
      className={ClassName}
      header={{ title: 'Выберите стратегию' }}
    >
      <MemoActiveStrategySelect className="choose-contact-strategy__select" />
      <div className="choose-contact-strategy__status-title">Текущий статус контакта</div>
      {/* <Speedometer
        className="choose-contact-strategy__speedometer"
        items={statuses}
        activeId={status.id}
        label={status.name}
      /> */}
      <div className="choose-contact-strategy__buttons">
        <LevelUpContactButton />
      </div>
    </PageLayout.Cloud>
  )
}

export const MemoChooseContactStrategy = memo(ChooseContactStrategy)
