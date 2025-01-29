import './style.scss'
import Attachment from '@/entities/contact/contact-cloud/attachment'
import AvatarBgImage from '@/shared/assets/images/avatar-bg-profile.jpg'
import { Avatar, PageLayout } from '@/shared/components'
import { $$editProfileForm, $$session } from '@/shared/effector'
import { $$profileAvatar } from '@/shared/effector/profile/avatar'
import { useUnit } from 'effector-react'
import { FC, useCallback } from 'react'

export const AvatarProfile: FC = () => {
  const [avatarChanged] = useUnit([$$profileAvatar.avatarChanged])

  const [submited] = useUnit([$$profileAvatar.submited])

  const [name, surname] = useUnit([$$editProfileForm.$firstName, $$editProfileForm.$lastName])

  const [profile] = useUnit([$$session.$profile])

  const avatarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target as HTMLInputElement
      if (input.files && input.files[0]) {
        const newFile = input.files[0]
        const formData = new FormData()
        formData.append('avatar', newFile)
        avatarChanged(formData)
        submited()
      }
    },
    [avatarChanged, submited]
  )
  return (
    <PageLayout.Cloud className="avatar-profile">
      <div className="avatar-profile__bg-wrapper">
        <img
          src={AvatarBgImage}
          className="avatar-profile__bg-image"
        />
      </div>
      <div className="avatar-profile__avatar-wrapper">
        <div className="avatar-profile__avatar">
          {profile.avatar ? (
            <img
              alt={name}
              src={`https://backmoon.prm4all.com/${profile.avatar}`}
              className="avatar"
              width={87}
              height={87}
            />
          ) : (
            <Avatar size={87} />
          )}
          <Attachment
            type="file"
            accept=".png, .jpg"
            onChange={avatarChange}
          />
        </div>
        <div className="avatar-profile__title-wrapper">
          <p className="title">
            {name} {surname}
          </p>
          <p className="text">Квалификация: {profile.qualification.name}</p>
        </div>
      </div>
    </PageLayout.Cloud>
  )
}
