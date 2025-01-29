import './style.scss'
import { YourPersonalAssistant } from '@/entities/landing-page'
import { LandingLayout } from '@/shared/components'

export const AboutPRM = () => {
  const windWidth: number = window.innerWidth

  return (
    <LandingLayout.Section className="about-prm">
      <div className="about-prm__title">
        Добро пожаловать в будущее{windWidth > 425 ? <br /> : ' '}эффективного бизнеса
      </div>

      <YourPersonalAssistant className="about-prm__yps" />

      <div className="about-prm__text">
        Освободите время и увеличьте доход с профессиональным виртуальным бизнес-ассистентом,
        который поможет вам монетизировать ваш список контактов
      </div>
    </LandingLayout.Section>
  )
}
