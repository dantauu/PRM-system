import { createEvent, createStore } from 'effector'

const $pageTitle = createStore<string>('')

const started = createEvent()
const pageTitleChanged = createEvent<string>()

$pageTitle.on(pageTitleChanged, (_, value) => value)

export const $$app = {
  $pageTitle,

  started,
  pageTitleChanged,
}
