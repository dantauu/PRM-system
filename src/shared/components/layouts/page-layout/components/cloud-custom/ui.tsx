import './style.scss'
import classNames from 'classnames'
import { CSSProperties, FC, LegacyRef, ReactNode } from 'react'

interface HeaderProps {
  title: ReactNode
  subtitle?: ReactNode

  right?: ReactNode
}

interface CloudProps {
  elementRef?: LegacyRef<HTMLDivElement>
  contentRef?: LegacyRef<HTMLDivElement>

  className?: string
  headerClassName?: string
  contentClassName?: string
  style?: CSSProperties

  noPaddingContent?: boolean
  header?: HeaderProps

  children?: ReactNode
}

export const CloudCustom: FC<CloudProps> = ({
  elementRef,
  contentRef,

  className,
  headerClassName,
  contentClassName,
  style,

  noPaddingContent,

  header,
  children,
}) => {
  // Variables
  const ClassName = classNames('cloudd', className)
  const HeaderClassName = classNames('cloud__header', headerClassName)
  const ContentClassName = classNames(
    'cloud__content',
    { 'cloud__content--no-padding': noPaddingContent },
    contentClassName
  )

  return (
    <div
      ref={elementRef}
      className={ClassName}
      style={style}
    >
      {header && (
        <div className={HeaderClassName}>
          <div className="cloud__header-left">
            <div className="cloud__title">{header.title}</div>
            {header.subtitle && <div className="cloud__subtitle">{header.subtitle}</div>}
          </div>
          <div className="cloud__header-right">{header.right}</div>
        </div>
      )}

      <div
        ref={contentRef}
        className={ContentClassName}
      >
        {children}
      </div>
    </div>
  )
}
