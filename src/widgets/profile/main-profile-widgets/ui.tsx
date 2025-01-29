import './style.scss'
import {
  DollarWidgetIcon,
  StarWidgetIcon,
  UsersWidgetIcon,
  WalletWidgetIcon,
} from '@/shared/assets'
import { PageLayout } from '@/shared/components'
import { $$session } from '@/shared/effector'
import { $$currentTotal } from '@/shared/effector/purchase/current-total'
import { $$activeCount } from '@/shared/effector/refferal/active-count'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, ReactNode, memo } from 'react'
import { Col, Row } from 'react-bootstrap'

interface MainProfileWidgetsProps {
  className?: string
}

export const MainProfileWidgets: FC<MainProfileWidgetsProps> = ({ className }) => {
  // Variables
  const ClassName = classNames('main-profile-widgets', className)

  const valueBalance = useUnit($$session.$profile)

  const [valueActiveCount] = useUnit([$$activeCount.$value, $$activeCount.$pending])

  const [valueCurrentTotal] = useUnit([$$currentTotal.$value, $$currentTotal.$pending])

  const profile = useUnit($$session.$profile)

  // Render
  const renderInCol = (element: ReactNode) => (
    <Col
      xs={12}
      md={6}
      lg={3}
    >
      {element}
    </Col>
  )

  return (
    <div className={ClassName}>
      <Row className="custom-row">
        {renderInCol(
          <PageLayout.SmallWidget
            Icon={UsersWidgetIcon}
            title="Количество партнеров"
            value={valueActiveCount}
          />
        )}
        {renderInCol(
          <PageLayout.SmallWidget
            Icon={DollarWidgetIcon}
            title="Товарооборот"
            value={`${valueCurrentTotal} $`}
          />
        )}
        {renderInCol(
          <PageLayout.SmallWidget
            Icon={WalletWidgetIcon}
            title="Заработано"
            value={`${valueBalance?.earned} $`}
          />
        )}
        {renderInCol(
          <PageLayout.SmallWidget
            Icon={StarWidgetIcon}
            title="Квалификация"
            value={profile?.qualification.name}
          />
        )}
      </Row>
    </div>
  )
}

export const MemoMainProfileWidgets = memo(MainProfileWidgets)
