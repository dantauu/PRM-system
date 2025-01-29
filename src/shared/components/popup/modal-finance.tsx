import { Blob } from '../blob/ui'
import { Button } from '../buttons'
import './styles.scss'
import { ModalCloseIcon } from '@/shared/assets'
import { $$alerts, $$balance } from '@/shared/effector'
import { $isModalOpen, closeModal } from '@/shared/effector/finance/modal-status'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

const ModalFinance = () => {
  const [isOpenModal] = useUnit([$isModalOpen])
  const showAlertDanger = useUnit($$alerts.showDanger)
  const showAlertSuccess = useUnit($$alerts.showSuccess)
  
  const [ balance ] = useUnit([$$balance.$balance]) //сейчас с бэка приходит ноль

  // const balance = 1220
  // console.log("balance", balance)

  const [ value, setValue ] = useUnit([$$balance.$value, $$balance.valueChanged])

  // console.log("value", value)

  const [ submit ] = useUnit([$$balance.submited]) 

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) || e.target.value === '') {
      setValue(Number(e.target.value))
    } else {
      showAlertDanger('Вводить только числа')
    }
  }
  const handleClickButton = (valueInput: number) => {
    if (valueInput >= 10 && valueInput <= balance) {
      submit()
      // showAlertSuccess('Заявка на вывод создана.')
      closeModal()
    } else if (valueInput < 10) {
      showAlertDanger('Минимальная сумма вывода 10$.')
    } else {
      showAlertDanger('Недостаточно средств на балансе.')
    }
  }

  useEffect(() => {
    if (isOpenModal) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'initial'
  }, [isOpenModal])

  return (
    <div
      className={isOpenModal ? 'modall open' : 'modall close'}
      onClick={() => closeModal()}
    >
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div
          onClick={() => closeModal()}
          className="icon-close"
        >
          <ModalCloseIcon
            width={51}
            height={51}
            className="icon-modal"
          />
        </div>
        <Blob image={'BlobWebpBlue'} />
        <p className="title">Введите сумму вывода.</p>
        <p className="text">Минимальная сумма 10$.</p>
        <p className="text">Коммисия за газ 1% от суммы перевода.</p>
        <input
          className="modal-content-input"
          value={value}
          onChange={handleChangeInput}
        />
        <Button
          variant="primary"
          onClick={() => handleClickButton(value)}
        >
          Вывести
        </Button>
      </div>
    </div>
  )
}

export default ModalFinance
