import { FC, memo } from 'react'
import { Button } from 'react-bootstrap'
import { PageLayout, Speedometer } from '@/shared/components'
import styles from "./edit-strategy-speedometer.module.scss"
import { useTheme } from '@/shared/theme'
import MenuDotsLight from "@/assets/account/images/menu-dots-light.png"
import MenuDotsDark from "@/assets/account/images/menu-dots-dark.png"
import { useUnit } from 'effector-react'
import { $$activeStrategy } from '@/shared/effector'
import { useSpeedometerStatuses } from '@/shared/hooks'
import { $$editStatus } from '../choose-status/model-status'

interface Props {
  // strategy: CustomStrategy
}

const EditStrategySpeedometer: FC<Props> = () => {
  const { theme } = useTheme()
  const src = theme === 'light' ? MenuDotsLight : MenuDotsDark

  const { speedometer } = useSpeedometerStatuses({})

  // console.log("speedometer для items", speedometer)

  const [activeStrategy] = useUnit([ // статусы активной стратегии, когда на странице Стратегии нажимаем Редактировать конкретную стратегию, она автоматически становится активной стратегией
    $$activeStrategy.$strategy
  ])

  // console.log("statuses", statuses)
  // console.log("activeStrategy", activeStrategy)

  const [id] = useUnit([$$editStatus.$statusId])
  const [name] = useUnit([$$editStatus.$name])

  return (
    <PageLayout.Cloud
      header={{
        title: `Спидометр ${activeStrategy?.name}`,
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

      <div className={styles.speedometerContainer}>

        <Speedometer
          className="choose-contact-strategy__speedometer"
          items={speedometer}
          activeId={id}
          // label={status.name}
        />

        <div className={styles.editedStatusNameContainer}>
          <p>{name}</p>
        </div>
      </div>
    </PageLayout.Cloud >
  )
}

export const MemoEditStrategySpeedometer = memo(EditStrategySpeedometer)
