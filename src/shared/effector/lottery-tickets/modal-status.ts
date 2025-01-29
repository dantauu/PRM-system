import { createEvent, createStore } from 'effector'

const openModal = createEvent()
const closeModal = createEvent()

const $isModalOpen = createStore(false)
  .on(openModal, () => true)
  .on(closeModal, () => false)

export { $isModalOpen, openModal, closeModal }
