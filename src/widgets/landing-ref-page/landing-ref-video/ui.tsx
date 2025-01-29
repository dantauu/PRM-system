import './style.scss'
import { LandingLayout } from '@/shared/components'
import { $$landingRefPage } from '@/shared/effector'
import { useUnit } from 'effector-react'

export const LandingRefVideo = () => {
  // Effector
  const landing = useUnit($$landingRefPage.$landing)

  if (!landing || !landing.youtube_video) {
    return null
  }

  const youtubeVideoLink = landing.youtube_video.includes('embed')
    ? landing.youtube_video
    : `https://www.youtube.com/embed/${landing.youtube_video.split('v=')[1]}`
  const renderItem = (link: string) => (
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
    </div>
  )

  return (
    <LandingLayout.Section
      className="landing-ref-video"
      useDefaultMT
    >
      <div className="landing-ref-video__wrapper">
        <p className="landing-ref-video__title">Смотри Ролик</p>
        <div className="presentation__items">{renderItem(youtubeVideoLink)}</div>
      </div>
    </LandingLayout.Section>
  )
}
