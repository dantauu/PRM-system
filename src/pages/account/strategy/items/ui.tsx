import { $$customStrategies } from '@/shared/effector'
import { StrategyItem } from '@/widgets/strategy'
import { useUnit } from 'effector-react'
import { ReactNode } from 'react'
import { Col, Row } from 'react-bootstrap'

export default function SttategiesPage() {
  // Effector
  const items = useUnit($$customStrategies.$items)

  // Render
  const renderInCol = (element: ReactNode, key: number) => (
    <Col
      key={key}
      xs={12}
      md={6}
      lg={4}
      xxl={3}
    >
      {element}
    </Col>
  )

  return (
    <Row className="custom-row">
      {items.map((strategy) =>
        renderInCol(<StrategyItem strategy={strategy} />, strategy.custom_strategy_id)
      )}
    </Row>
  )
}
