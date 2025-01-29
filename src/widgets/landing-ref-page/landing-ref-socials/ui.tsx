import './style.scss'
import { LandingLayout } from '@/shared/components'
import { $$landingRefPage } from '@/shared/effector'
import classNames from 'classnames'
import { useUnit } from 'effector-react'

export const LandingRefSocials = () => {
  // Effector
  const landing = useUnit($$landingRefPage.$landing)

  if (!landing || (!landing.telegram && !landing.youtube && !landing.instagram && !landing.vk)) {
    return null
  }

  // Render
  const renderItem = (text: string, type: string) => {
    if (!text) {
      return null
    }

    const ImageClassName = classNames(
      'landing-ref-socials__item-image',
      'landing-ref-socials__item-image--' + type
    )

    return (
      <a
        className="landing-ref-socials__item"
        href={text}
        target="_blank"
        rel="noreferrer"
      >
        <div className={ImageClassName} />
        <div className="landing-ref-socials__item-text">{type}</div>
      </a>
    )
  }

  return (
    <LandingLayout.Section
      className="landing-ref-socials"
      useDefaultMT
    >
      <div className="landing-ref-socials__title">Ищи меня в социальных сетях</div>
      <div className="landing-ref-socials__items">
        {renderItem(landing.telegram, 'telegram')}
        {renderItem(landing.youtube, 'youtube')}
        {renderItem(landing.vk, 'vk')}
        {renderItem(landing.instagram, 'instagram')}
      </div>
    </LandingLayout.Section>
  )
}
