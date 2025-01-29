import './style.scss'
import NoAvatarDark from '@/assets/account/images/no-avatar-dark.png'
import NoAvatarLight from '@/assets/account/images/no-avatar-light.png'
import { useTheme } from '@/shared/theme'
import classNames from 'classnames'
import { CSSProperties, FC, useMemo } from 'react'
import Skeleton from 'react-loading-skeleton'
import { $$contactAvatar } from '@/shared/effector/contact/contact-avatar'
import { useUnit } from 'effector-react'
import { $$activeContact } from '@/entities/contact/model'

interface AvatarProps {
  className?: string
  src?: string
  size?: number

  isSkeleton?: boolean
}

export const Avatar: FC<AvatarProps> = ({ className, src: otherSrc, size, isSkeleton }) => {
  // Hooks
  const { theme } = useTheme()
  // Variables
  const ClassName = classNames('avatar', className)
  const src = otherSrc ?? theme === 'light' ? NoAvatarLight : NoAvatarDark
  // const src = otherSrc ? otherSrc : theme === 'light' ? NoAvatarLight : NoAvatarDark

  // console.log("otherSrc", otherSrc)
  // console.log("src", src)

  const [avatar, contact_id] = useUnit([
    $$contactAvatar.$avatar, $$contactAvatar.$contactId
  ])

  // console.log("avatar", avatar)
  // console.log("contact_id", contact_id)

  // const contact = useUnit($$activeContact.$item)

  // const getSrc = () => {
  //   let src
  //   if (avatar) {
  //     if (avatar?.get('avatar') instanceof Blob) {
  //       src = URL.createObjectURL(avatar?.get('avatar') as Blob)
  //     }
  //   } else {
  //     src = theme === 'light' ? NoAvatarLight : NoAvatarDark
  //   }
  //   return src
  // }

  // console.log("getSrc", getSrc())

  // Memo
  const style = useMemo<CSSProperties | undefined>(
    () =>
      size
        ? {
          minWidth: `${size}px`,
          maxWidth: `${size}px`,
          minHeight: `${size}px`,
          maxHeight: `${size}px`,
          borderRadius: `${size}px`,
        }
        : undefined,
    [size]
  )

  // Render
  if (isSkeleton) {
    return (
      <Skeleton
        style={style}
        className={ClassName}
        width={size}
        height={size}
        circle
      />
    )
  }

  return (
    <img
      style={style}
      className={ClassName}
      src={src}
      // src={getSrc()}
      // src={contact?.avatar}
      alt="avatar"
    />
  )
}
