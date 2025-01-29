//Компонент Выбурите статус 

// import './style.scss'
import { FC, memo, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { PageLayout } from '@/shared/components'
import styles from "./choose-status.module.scss"
import { useTheme } from '@/shared/theme'
import MenuDotsLight from "@/assets/account/images/menu-dots-light.png"
import MenuDotsDark from "@/assets/account/images/menu-dots-dark.png"
import { StatusSelect } from '@/features/contact'
import { useUnit } from 'effector-react'
import { $$activeStrategy } from '@/shared/effector'
import { $$editStatus } from './model-status'
import { $$editStep } from './model-step'
import Dropdown from './dropdown'

interface Props {
  // strategy: CustomStrategy
}

const ChooseStatus: FC<Props> = () => {

  const { theme } = useTheme()
  const src = theme === 'light' ? MenuDotsLight : MenuDotsDark

  const [statusChanged, statusId] = useUnit([$$editStatus.statusChanged, $$editStatus.$statusId])

  // console.log("status", status)
  // console.log("statusId", statusId)

  const [stepChanged] = useUnit([$$editStep.stepChanged])

  const [statuses] = useUnit([$$activeStrategy.$statuses]) // статусы активной стратегии, когда на странице Стратегии нажимаем Редактировать конкретную стратегию, она автоматически становится активной стратегией

  console.log("statuses", statuses)

  const [steps] = useUnit([$$activeStrategy.$steps])

  console.log("steps", steps)

  const statusesForSelect = statuses?.map((status) => {
    return {
      value: status.custom_strategy_status_id,
      text: status.name,
    }
  })

  //statusesForSelect[0].value
  const [selectValue, setSelectValue] = useState(statusId || statusesForSelect[0].value)
  // console.log("selectValue", selectValue)

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    statusChanged(Number(event.target.value))
    stepChanged(Number(event.target.value))
    setSelectValue(Number(event.target.value))
  }

  return (
    <PageLayout.Cloud
      header={{
        title: 'Выберите статус',
        right: (
          <Button className={styles.header_button}>
            <img
              className=""
              src={src}
              alt="menu-button"
            />
          </Button>
        )
      }}
    >

      {/* <Form.Select
        value={selectValue ?? 'Статус не выбран'}
        onChange={handleSelectChange}
      >
        {statuses && statuses.map((status) => (
          <option key={`${status?.name}`} value={status?.custom_strategy_status_id}>{status?.name}</option>
        ))}
      </Form.Select> */}

      <div>
        <Dropdown />
      </div>
    </PageLayout.Cloud >
  )
}

export const MemoChooseStatus = memo(ChooseStatus)
