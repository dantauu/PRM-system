import { Blob } from '../blob/ui'
import './styles.scss'
import { ModalCloseIcon } from '@/shared/assets'
import { $$PotentialIncome } from '@/shared/effector'
import { $$ModalIncomeCalculation } from '@/shared/effector/finance/modal-income-calculation'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

const ModalIncomeCalculation = () => {
  const [copy, setCopy] = useState(false)

  const [value] = useUnit([$$PotentialIncome.$value])
  const [isOpenModal, closeModalIncomeCalculation] = useUnit([
    $$ModalIncomeCalculation.$isModal,
    $$ModalIncomeCalculation.closeModal,
  ])

  useEffect(() => {
    if (isOpenModal) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'initial'
  }, [isOpenModal])

  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false)
      }, 2000)
    }
  }, [copy])

  return (
    <div
      className={isOpenModal ? 'modall open' : 'modall close'}
      onClick={() => closeModalIncomeCalculation()}
    >
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div
          onClick={() => closeModalIncomeCalculation()}
          className="icon-close"
        >
          <ModalCloseIcon
            width={51}
            height={51}
            className="icon-modal"
          />
        </div>
        <Blob image={'BlobWebpBlue'} />

        <p className="title">Полный расчет потенциального дохода</p>

        <div className="wrapper-income">
          {value.values.length &&
            value.values.map((el, i) => (
              <p key={i}>
                Уровень {i + 1}: <span>{el} $</span>
              </p>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ModalIncomeCalculation
