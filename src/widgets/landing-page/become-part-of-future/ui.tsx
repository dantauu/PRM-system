import './style.scss'
import { GradientTitle, YourPersonalAssistant } from '@/entities/landing-page'
import { LandingLayout, MemoBlickButton } from '@/shared/components'

export const BecomePartOfFuture = () => {
  return (
    <LandingLayout.Section
      className="become-part-of-future"
      useDefaultMT
    >
      <GradientTitle className="become-part-of-future__title">
        СТАНЬТЕ ЧАСТЬЮ
        <br />
        БУДУЩЕГО УЖЕ СЕГОДНЯ!
      </GradientTitle>

      <YourPersonalAssistant className="become-part-of-future__yps" />

      <div className="become-part-of-future__sign-up">
        <MemoBlickButton>Зарегистрироваться</MemoBlickButton>
      </div>
    </LandingLayout.Section>
  )
}
