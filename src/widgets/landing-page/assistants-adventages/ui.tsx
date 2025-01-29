import './style.scss'
import HandsImage from '@/assets/landing/images/hands.png'
import MoneyUpImage from '@/assets/landing/images/money-up.png'
import SocialImage from '@/assets/landing/images/soc.png'
import { AdvantagesList, RunningLine } from '@/entities/landing-page'
import { LandingLayout } from '@/shared/components'
import AdvantagesItem from '@/types/AdvantagesItem'

const advantages: AdvantagesItem[] = [
  {
    id: 1,
    image: MoneyUpImage,
    title: 'монетизация контактов',
    text: 'Интегрированный инструмент позволит вам эффективно монетизировать ваш список контактов.',
    lighting: 'low',
  },
  {
    id: 2,
    image: SocialImage,
    title: 'автоматизация маркетинга',
    text: 'Ассистент будет отправлять персонализированные сообщения и предложения вашим клиентам, привлекая новых и удерживая старых.',
    lighting: 'low',
  },
  {
    id: 3,
    image: HandsImage,
    title: 'партнёрская программа',
    text: 'Приглашайте с помощью PRM новых пользователей и получайте до 60% прибыли с товарооборота.',
    lighting: 'low',
  },
]

export const AssistantsAdvantages = () => {
  return (
    <LandingLayout.Section
      anchor="AssistantsAdvantages"
      className="assistants-advantages"
      useDefaultMT
    >
      <LandingLayout.Section
        className="assistants-advantages__running-line"
        noMargin
      >
        <RunningLine
          text="PRM4ALL"
          title="Преимущества Бизнес Ассистента"
          reverse
        />
      </LandingLayout.Section>

      <AdvantagesList
        className="assistants-advantages__items"
        items={advantages}
      />
    </LandingLayout.Section>
  )
}
