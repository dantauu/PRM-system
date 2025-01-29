import { createEvent, createStore } from 'effector';


const openModal = createEvent()
const closeModal = createEvent()

const status = localStorage.getItem('is-first-loading') === null ? true : false

const $isModalOpen = createStore(status)
  .on(openModal, () => true)
  .on(closeModal, () => false)

export { $isModalOpen, openModal, closeModal }
