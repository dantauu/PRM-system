import './style.scss'
import classNames from 'classnames'
import { FC, memo } from 'react'

interface SmallWidgetProps {
  className?: string

  Icon: React.VFC<React.SVGProps<SVGSVGElement>>
  title: string
  value: string | number
}

export const SmallWidget: FC<SmallWidgetProps> = ({ className, Icon, title, value }) => {
  // Variables
  const ClassName = classNames('small-widget', className)

  return (
    <div className={ClassName}>
      <div className="small-widget__icon">
        <Icon
          width={32}
          height={32}
        />
      </div>
      <div className="small-widget__text">
        <div className="small-widget__title">{title}</div>
        <div className="small-widget__value">{value}</div>
      </div>
    </div>
  )
}

export const MemoSmallWidget = memo(SmallWidget)
