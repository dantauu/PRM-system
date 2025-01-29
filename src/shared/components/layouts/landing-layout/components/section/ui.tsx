import './style.scss'
import classNames from 'classnames'
import { FC } from 'react'

interface SectionProps {
  anchor?: string
  className?: string

  children: React.ReactNode

  noMargin?: boolean
  usePaddings?: boolean
  useDefaultMT?: boolean
}
export const Section: FC<SectionProps> = ({
  anchor,
  className,
  children,
  noMargin,
  usePaddings,
  useDefaultMT,
}) => {
  // Variables
  const ClassName = classNames(
    'landing-section',
    {
      'landing-section--no-margin': noMargin,
      'landing-section--use-paddings': usePaddings,
      'landing-section--use-default-mt': useDefaultMT,
    },
    className
  )
  return (
    <>
      {anchor && (
        <div
          id={anchor}
          className="landing-section__anchor"
        />
      )}
      <div className={ClassName}>{children}</div>
    </>
  )
}
