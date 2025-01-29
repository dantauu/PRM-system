import './style.scss'
import { LandingLayout, MemoBlickButton } from '@/shared/components'
import Marquee from 'react-fast-marquee'

export const LandingRefSignUp = () => {
  // Memo
  const items = new Array(8).fill('PRM4ALL')

  return (
    <LandingLayout.Section
      className="landing-ref-sign-up"
      noMargin
    >
      <Marquee
        loop={0}
        className="landing-ref-sign-up__marquee"
      >
        {items.map((text, index) => (
          <div
            key={index}
            className="landing-ref-sign-up__item"
          >
            {text}
          </div>
        ))}
      </Marquee>

      <div className="landing-ref-sign-up__button">
        <MemoBlickButton>Зарегистрироваться</MemoBlickButton>
      </div>
    </LandingLayout.Section>
  )
}
