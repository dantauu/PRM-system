import './style.scss'
import ProfileBannerImage from '@/shared/assets/images/banner-profile.webp'
import { FC } from 'react'

export const BannerProfile: FC = () => {
  return (
    <div className="banner-profile">
      <div className="banner-profile__bg-wrapper">
        <img
          src={ProfileBannerImage}
          className="banner-profile__bg-image"
        />
      </div>
      <div className="banner-profile__text">
        <div className="banner-profile__title">
          Пригласи инвестора в проект и получи 5% в токенах!
        </div>
      </div>
    </div>
  )
}
