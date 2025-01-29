import './style.scss'
import { PageLayout } from '@/shared/components'
import { $$pools } from '@/shared/effector'
import { useUnit } from 'effector-react'
import { FC } from 'react'

interface Props {}

export const LevelsProgressBar: FC<Props> = ({}) => {
  const max = 15

  // Effector
  const levels = useUnit($$pools.$items)

  const completedLevels = levels.filter((level) => level.completed).length
  return (
    <PageLayout.Cloud
      contentClassName="levels-progress-bar"
      header={{ title: 'Доступные уровни' }}
    >
      <div className="levels-progress-bar__container">
        <div className="levels-progress-bar__scale">
          {[...Array(max)].map((item, i) =>
            levels.find((level, index) => index === i) ? (
              <span
                className="levels-progress-bar__scale-item_active"
                key={i}
              >
                {i + 1}
              </span>
            ) : (
              <span
                className="levels-progress-bar__scale-item"
                key={i}
              >
                {i + 1}
              </span>
            )
          )}
        </div>
        <div className="levels-progress-bar__bar">
          <div
            className="levels-progress-bar__bar-completed"
            style={{ width: `${(completedLevels / max) * 100}%` }}
          ></div>
        </div>
      </div>
    </PageLayout.Cloud>
  )
}
