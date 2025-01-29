import { createEvent, createStore } from 'effector'

const openModalContact = createEvent()
const closeModalContact = createEvent()

const $isModalContactOpen = createStore(false)
  .on(openModalContact, () => true)
  .on(closeModalContact, () => false)

export { $isModalContactOpen, openModalContact, closeModalContact }
