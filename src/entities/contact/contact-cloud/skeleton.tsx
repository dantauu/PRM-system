import './style.scss'
import { Avatar, MemoSkeletonButton, PageLayout } from '@/shared/components'
import classNames from 'classnames'
import { FC, useLayoutEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

interface SkeletonContactCloudProps {
  title?: string
  subtitle?: string
}

export const SkeletonContactCloud: FC<SkeletonContactCloudProps> = ({ title, subtitle }) => {
  // Refs
  const elementRef = useRef<HTMLDivElement | null>(null)

  // State
  const [elementWidth, setElementWidth] = useState(0)

  // Variables
  const ClassName = classNames('contact-cloud', {
    'contact-cloud--column': elementWidth <= 560 && elementWidth !== 0,
  })

  // Effects
  useLayoutEffect(() => {
    if (!elementRef.current) {
      return
    }

    const handleResize = () => {
      setElementWidth(elementRef?.current?.offsetWidth ?? 0)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <PageLayout.Cloud
      elementRef={elementRef}
      contentClassName={ClassName}
      header={{
        title: title || <Skeleton width={200} />,
        subtitle: subtitle || <Skeleton width={120} />,
      }}
    >
      <div className="contact-cloud__row">
        <div className="contact-cloud__content">
          <div className="contact-cloud__avatar">
            <Avatar
              size={100}
              isSkeleton
            />
          </div>
          <div className="contact-cloud__info">
            <Skeleton
              className="contact-cloud__name"
              width={90}
            />
            <div className="contact-cloud__strategy"></div>
            <Skeleton
              className="contact-cloud__status"
              width={120}
            />
          </div>
        </div>

        <div className="contact-cloud__speed-test">
          <Skeleton
            width={265}
            height={152}
            borderRadius={32}
          />
        </div>
      </div>
      <div className="contact-cloud__row">
        <div className="contact-cloud__buttons">
          <MemoSkeletonButton />
          <MemoSkeletonButton />
          <MemoSkeletonButton />
        </div>
      </div>
    </PageLayout.Cloud>
  )
}
