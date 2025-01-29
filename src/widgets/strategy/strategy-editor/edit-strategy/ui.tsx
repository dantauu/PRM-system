import { $$editStatus } from '../choose-status/model-status'
import { $$editStep } from '../choose-status/model-step'
import styles from './edit-strategy.module.scss'
import MenuDotsDark from '@/assets/account/images/menu-dots-dark.png'
import MenuDotsLight from '@/assets/account/images/menu-dots-light.png'
import { Form, MemoButton, PageLayout } from '@/shared/components'
import { $$activeStrategy, $$globalStrategyStatusColor } from '@/shared/effector'
import { useMediaQuery } from '@/shared/hooks'
import { useTheme } from '@/shared/theme'
import { useUnit } from 'effector-react'
import { FC, memo, useRef } from 'react'
import { Button } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface Props {
  // strategy: CustomStrategy
}

const EditStrategy: FC<Props> = () => {
  const { theme } = useTheme()
  const src = theme === 'light' ? MenuDotsLight : MenuDotsDark
  const isTablet = useMediaQuery('screen and (max-width: 768px)')
  // console.log("isTablet", isTablet)

  const [name, color] = useUnit([$$editStatus.$name, $$editStatus.$color])

  const [description] = useUnit([$$editStep.$description])

  // console.log("name", name)
  console.log('description', description)
  // console.log("color", color)

  const [nameChanged, colorChanged] = useUnit([$$editStatus.nameChanged, $$editStatus.colorChanged])

  const [descriptionChanged] = useUnit([$$editStep.descriptionChanged])

  const [submitedStatus, canSubmitStatus] = useUnit([
    $$editStatus.submited,
    $$editStatus.$canSubmit,
  ])
  const [submitedStep, canSubmitStep] = useUnit([$$editStep.submited, $$editStep.$canSubmit])

  const [setInitDesc] = useUnit([$$editStep.setInitDesc])
  const [setInitName, setInitColor] = useUnit([$$editStatus.setInitName, $$editStatus.setInitColor])

  const [colors, status] = useUnit([
    $$globalStrategyStatusColor.getAll.$items,
    $$globalStrategyStatusColor.getAll.$status,
  ])

  const quillRef = useRef(null)

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ size: ['small', false, 'large', 'huge'] }],
    ],
  }

  const formats = [
    'header',
    'font',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'size',
  ]

  const cancelHandler = () => {
    setInitDesc()
    setInitName()
    setInitColor()
  }

  const submitHandler = () => {
    submitedStatus()
    submitedStep()
  }

  return (
    <PageLayout.Cloud
      header={{
        title: `Выбран статус: ${name}`,
        right: (
          <Button className={styles.header_button}>
            <img
              className=""
              src={src}
              alt="menu-button"
            />
          </Button>
        ),
      }}
    >
      <div>
        <Form.Input
          label="Название статуса"
          value={name}
          onChange={nameChanged}
        />
        <div className={styles.nameLength}>{name.length}/30</div>
      </div>

      <div className={styles.colorPickerContainer}>
        <Form.SimpleColorPicker
          colors={colors.map(({ color_HEX, global_strategy_status_color_id }) => ({
            value: global_strategy_status_color_id,
            color: color_HEX,
          }))}
          pending={status == 'pending'}
          value={color}
          onChange={colorChanged}
        />
      </div>

      {/* <Form.Input
        type="textarea"
        label="Скрипт"
        value={description}
        onChange={descriptionChanged}
      /> */}

      <div className={styles.scriptContainer}>
        <label className={styles.scriptLabel}>Скрипт</label>
        <ReactQuill
          ref={quillRef}
          value={description}
          onChange={descriptionChanged}
          modules={modules}
          formats={formats}
        />
      </div>

      <div
        className={
          isTablet ? `${styles.buttonsContainer} ${styles.tablet}` : styles.buttonsContainer
        }
      >
        <MemoButton
          disabled={!canSubmitStatus || !canSubmitStep}
          onClick={submitHandler}
        >
          Сохранить
        </MemoButton>

        <MemoButton
          variant="secondary"
          onClick={cancelHandler}
        >
          Отмена
        </MemoButton>
      </div>
    </PageLayout.Cloud>
  )
}

export const MemoEditStrategy = memo(EditStrategy)
