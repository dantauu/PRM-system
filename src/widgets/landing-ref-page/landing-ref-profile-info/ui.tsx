import './style.scss'
import BlobImage from '@/assets/landing/images/bl2.gif'
import { Avatar } from '@/shared/components'
import { $$landingRefPage } from '@/shared/effector'
import { useTelephoneMask } from '@/shared/hooks'
import { useUnit } from 'effector-react'

export const LandingRefProfileInfo = () => {
  // Effector
  const landing = useUnit($$landingRefPage.$landing)
  const phone = useTelephoneMask(landing.phone)

  return (
    <div className="landing-ref-profile-info">
      <div className="landing-ref-profile-info__wrapper">
        <div className="landing-ref-profile-info__left">
          {landing.avatar ? (
            <img
              alt={landing.first_name}
              src={`https://backmoon.prm4all.com/${landing.avatar}`}
              className="avatar"
              width={637}
              height={637}
            />
          ) : (
            <Avatar size={637} />
          )}
        </div>
        <div className="landing-ref-profile-info__right">
          <div className="landing-ref-profile-info__info">
            <div className="landing-ref-profile-info__info-avatar">
              {landing.avatar ? (
                <img
                  alt={landing.first_name}
                  src={`https://backmoon.prm4all.com/${landing.avatar}`}
                  className="avatar"
                  width={143}
                  height={143}
                />
              ) : (
                <Avatar size={143} />
              )}
            </div>
            <div className="landing-ref-profile-info__text">
              <div className="landing-ref-profile-info__name">
                {landing?.first_name} {landing?.last_name}
              </div>
              <div className="landing-ref-profile-info__subtitle">Ваш персональный консультант</div>
            </div>
          </div>

          {landing?.about && <div className="landing-ref-profile-info__about">{landing.about}</div>}
          {landing?.phone && (
            <div className="landing-ref-profile-info__phone">
              Телефон для связи: <span>{phone?.maskedValue}</span>
            </div>
          )}
          <div className="landing-ref-profile-info__made-by">
            Создано
            <br /> PRM
          </div>
          <div className="landing-ref-profile-info__prm">
            <img
              className="landing-ref-profile-info__blob-img"
              src={BlobImage}
              alt="blob"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
