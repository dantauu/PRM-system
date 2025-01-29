import { createEvent, createStore } from 'effector'

const openModalLastContact = createEvent()
const closeModalLastContact = createEvent()

const $isModalLastContactOpen = createStore(false)
  .on(openModalLastContact, () => true)
  .on(closeModalLastContact, () => false)

export { $isModalLastContactOpen, openModalLastContact, closeModalLastContact }
