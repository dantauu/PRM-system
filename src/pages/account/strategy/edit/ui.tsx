// Страница Стратегии/Редактировать

import { $$lastContact } from '@/shared/effector'
import { LastContact, SalesFunnel } from '@/widgets/contact'
import { MemoEditStrategyForm, MemoStrategyDiagram, MemoStrategyEditor } from '@/widgets/strategy'
import { useUnit } from 'effector-react'
import { Col, Row } from 'react-bootstrap'
import styles from "./edit.module.scss"

const StrategyEditPage = () => {
  // Effector
  const lastContact = useUnit($$lastContact.$item)

  return (
    <>
      <Row className="custom-row">
        <Col
          xs={12}
          lg={6}
        >
          <MemoEditStrategyForm />
        </Col>


        {/* <Col xs={12}>
        <MemoStrategyDiagram />
      </Col> */}

        {/* {lastContact && (
        <Col
          xs={12}
          lg={6}
        >
          <LastContact />
        </Col>
      )} */}
      </Row>
      <div className={styles.MemoStrategyEditorContainer}><MemoStrategyEditor /></div>
    </>
  )
}

export default StrategyEditPage
