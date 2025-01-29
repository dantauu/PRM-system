import styles from "./strategy-editor.module.scss"
import { CustomStrategy } from '@/shared/api'
import { FC, memo, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { MemoChooseStatus } from './choose-status/ui'
import { MemoEditStrategy } from './edit-strategy/ui'
import { MemoEditStrategySpeedometer } from './speedometer/ui'
import { useMediaQuery } from "@/shared/hooks"

interface Props {
  // strategy: CustomStrategy
}

const StrategyEditor: FC<Props> = () => {

  const isMobile = useMediaQuery('screen and (max-width: 425px)')

  return (
    <Row>
      <Col
        className={isMobile ? `${styles.col}` : ``}
        xs={12}
        lg={3}
      >
        <MemoChooseStatus />
      </Col>
      <Col
        className={isMobile ? `${styles.col}` : ``}
        xs={12}
        lg={4}
      >
        <MemoEditStrategy />
      </Col>
      <Col
        className={isMobile ? `${styles.col}` : ``}
        xs={12}
        lg={4}
      >
        <MemoEditStrategySpeedometer />
      </Col>
    </Row>
  )
}

export const MemoStrategyEditor = memo(StrategyEditor)
