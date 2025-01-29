import './style.scss'
import { LevelsIcon } from '@/shared/assets'
import { LevelsIconJackpot } from '@/shared/assets'
import { useTheme } from '@/shared/theme'
import classNames from 'classnames'
import { FC, memo } from 'react'

interface SmallWidgetProps {
  className?: string

  // Icon: React.VFC<React.SVGProps<SVGSVGElement>>
  // Icon: string
  index: number
  amount: number
  quantity: number
  available: boolean
  status: string
}

export const SmallWidgetLevels: FC<SmallWidgetProps> = ({
  className,
  index,
  amount,
  quantity,
  available,
  status,
}) => {
  // Variables
  const { theme } = useTheme()

  const ClassName = classNames('small-widget-levels', { active: available }, className)
  const TextClassName = classNames('small-widget-levels__text', { active: available })
  const IconClassName = classNames('small-widget-levels__icon', { active: available })

  return (
    <div className={ClassName}>
      <div className={IconClassName}>
        <img
          src={status === 'jackpot' ? LevelsIconJackpot : LevelsIcon}
          width={status === 'jackpot' ? 22.36 : 35}
          height={status === 'jackpot' ? 22.36 : 35}
        />
        {status !== 'jackpot' && <div className="small-widget-levels__icon__index">{index}</div>}
      </div>
      <div className={TextClassName}>
        <div className="small-widget-levels__index">
          {' '}
          {status === 'jackpot' ? 'Jackpot' : `Pool ${index}`}
        </div>
        <div className="small-widget-levels__title">{amount} $</div>
        <div className="small-widget-levels__value">
          {' '}
          {status === 'jackpot' ? '' : `Qualified:`}
        </div>

        {status !== 'jackpot' && (
          //small-widget-levels__quantityContainer__dark  theme
          <div
            className={`${
              theme === 'light'
                ? 'small-widget-levels__quantityContainer__light'
                : 'small-widget-levels__quantityContainer__dark'
            } `}
          >
            <div className="small-widget-levels__quantity">{quantity}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export const MemoSmallWidgetLevels = memo(SmallWidgetLevels)
