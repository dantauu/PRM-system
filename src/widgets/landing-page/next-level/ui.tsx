import { YourIncome } from './components/your-income'
import './style.scss'
import { GradientTitle } from '@/entities/landing-page'
import { LandingLayout } from '@/shared/components'

export const NextLevel = () => {
  return (
    <LandingLayout.Section className="next-level">
      <div className="next-level__left">
        <YourIncome />
      </div>

      <div className="next-level__right">
        <div className="next-level__title">
          <GradientTitle>
            Ваш бизнес
            <br />
            на новом уровне!
          </GradientTitle>
        </div>
      </div>
    </LandingLayout.Section>
  )
}
