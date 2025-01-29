import './style.scss'
import { RunningLine } from '@/entities/landing-page'
import { LandingLayout, MemoBlickButton } from '@/shared/components'

export const Presentation = () => {
  // Render
  const renderItem = (title: string, link: string) => (
    <div className="presentation__item">
      <div className="presentation__item-video">
        <iframe
          src={link}
          title="YouTube video player"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          allowfullscreen
        ></iframe>
      </div>
      <div className="presentation__item-title">{title}</div>
    </div>
  )
  return (
    <LandingLayout.Section
      anchor="Presentation"
      className="presentation"
      useDefaultMT
    >
      <LandingLayout.Section
        className="presentation__running-line"
        noMargin
      >
        <RunningLine
          text="ABOUT US"
          title="Подробнее о проекте"
        />
      </LandingLayout.Section>

      <div className="presentation__items">
        {renderItem('Презентация', 'https://www.youtube.com/embed/W3wuVtjWzLQ?si=puCtxm7dsHzuzOJy')}
        {renderItem('Promo', 'https://www.youtube.com/embed/W3wuVtjWzLQ?si=puCtxm7dsHzuzOJy')}
      </div>

      <div className="presentation__sign-up">
        <MemoBlickButton>Зарегистрироваться</MemoBlickButton>
      </div>
    </LandingLayout.Section>
  )
}
