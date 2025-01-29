import { PageLayout } from '@/shared/components'
import { ILevel } from '@/widgets/levels'
import { FC, ReactNode } from 'react'
import { Col, Row } from 'react-bootstrap'

interface Props {
  level: ILevel
  index: number
}

export const LevelsItem: FC<Props> = ({ level, index }) => {
  const renderInCol = (element: ReactNode) => (
    <Col
      xs={12}
      md={4}
      lg={3}
      xxl={2} // 1400
    >
      {element}
    </Col>
  )

  return (
    <>
      {renderInCol(
        <PageLayout.SmallWidgetLevels
          // Icon={LevelsIcon}
          index={index}
          amount={level.amount}
          quantity={level.value}
          available={level.available}
          status={level.status}
        />
      )}
    </>
  )
}
