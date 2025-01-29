import { createEvent, createStore } from 'effector'

const openModal = createEvent()
const closeModal = createEvent()

const $isModal = createStore(false)
  .on(openModal, () => true)
  .on(closeModal, () => false)

export const $$ModalIncomeCalculation = {
  $isModal,
  openModal,
  closeModal,
}
