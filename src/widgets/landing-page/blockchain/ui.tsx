import './style.scss'
import GuardImage from '@/assets/landing/images/guard.png'
import LockImage from '@/assets/landing/images/lock.png'
import MoneyImage from '@/assets/landing/images/money.png'
import { AdvantagesList, RunningLine } from '@/entities/landing-page'
import { LandingLayout } from '@/shared/components'
import AdvantagesItem from '@/types/AdvantagesItem'

const advantages: AdvantagesItem[] = [
  {
    id: 2,
    image: GuardImage,
    title: 'всё прозрачно',
    text: 'WhitePaper и SmartContract доступны в открытом доступе.',
    lighting: 'mid',
  },
  {
    id: 3,
    image: LockImage,
    title: 'защита структуры',
    text: 'Блокчейн обеспечивает максимальный уровнь безопасности вашей структуры.',
    lighting: 'mid',
  },
  {
    id: 4,
    image: MoneyImage,
    title: 'прозрачные начисления',
    text: 'Все начисления производятся смартконтрактом в режиме реального времени.',
    lighting: 'mid',
  },
]

export const Blockchain = () => {
  return (
    <LandingLayout.Section
      anchor="BlockChain"
      className="blockchain"
      useDefaultMT
    >
      <LandingLayout.Section
        className="blockchain__running-line"
        noMargin
      >
        <RunningLine
          text="web 3.0"
          title={
            <>
              Проект построен на BlockChain Структуру и расчеты осуществляет
              <br />
              SmartContract
            </>
          }
        />
      </LandingLayout.Section>

      <AdvantagesList
        className="blockchain__items"
        items={advantages}
      />
    </LandingLayout.Section>
  )
}
