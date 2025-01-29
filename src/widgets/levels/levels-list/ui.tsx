import './style.scss'
import { LevelsItem } from '@/entities/levels'
import { $$pools } from '@/shared/effector'
import { useUnit } from 'effector-react'
import { FC } from 'react'
import { Row } from 'react-bootstrap'

export interface ILevel {
  amount: number
  value: number
  available: boolean
  status: string
}

const jackpotLevel: ILevel[] = [
  {
    amount: 3000,
    value: 0,
    available: true,
    status: 'jackpot',
  },
]

interface Props {}

export const LevelsList: FC<Props> = () => {
  // Effector
  const levels = useUnit($$pools.$items)
  return (
    <div className="levels_container">
      <Row className="levels-row">
        {levels.map((level, index) => (
          <LevelsItem
            key={`${level.amount} ${index}`}
            level={level}
            index={index + 1}
          />
        ))}

        {jackpotLevel.map((level, index) => (
          <LevelsItem
            key={`${level.amount} ${index}`}
            level={level}
            index={index + 1}
          />
        ))}
      </Row>
    </div>
  )
}
