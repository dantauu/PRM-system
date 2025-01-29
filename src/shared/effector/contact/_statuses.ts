import {
  ContactCustomStrategyStatus,
  CustomStrategyStatus,
  UpdateCustomStrategyStatus,
  contactCustomStrategyStatus,
  customStrategyStatus,
} from '@/shared/api'
import { $$activeStrategy } from '@/shared/effector'
import { RequestFactory } from '@/shared/factories'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { reset } from 'patronum'

type MapStatusToContactId = Record<number, ContactCustomStrategyStatus['custom_strategy_status_id']>
type CountContactsInStatuses = Record<number, number>

const mapStatusToContactId = (items: ContactCustomStrategyStatus[]) =>
  items.reduce(
    (t, item) => ({ ...t, [item.contact_id.contact_id]: item.custom_strategy_status_id }),
    {} as MapStatusToContactId
  )

const updateOneItem = (
  items: ContactCustomStrategyStatus[],
  updatedItem: ContactCustomStrategyStatus
) => {
  const copied = [...items]
  const index = copied.findIndex(
    (item) => item.contact_id.contact_id === updatedItem.contact_id.contact_id
  )
  if (index === -1) {
    return items
  }

  copied[index] = updatedItem
  return copied
}

//* Consts
const LIMIT = 1000

//* Factories
const { submited: requestSubmited, ...request } = RequestFactory({
  name: 'get-all CONTACT_CUSTOM_STRATEGY_STATUSES',
  api: contactCustomStrategyStatus.getAll,
})

const getOne = RequestFactory({
  name: 'get-one CONTACT_CUSTOM_STRATEGY_STATUSES',
  api: contactCustomStrategyStatus.getByContact,
})

//* Stores
const $limit = createStore<number>(LIMIT)
const $offset = createStore<number>(0)

export const updateContactStatus = createEvent()

type UpdateCustomStrategyStatusData = Omit<UpdateCustomStrategyStatus, 'custom_strategy_status_id'>

const $items = createStore<ContactCustomStrategyStatus[]>([])

type EffectParams = {
  data: UpdateCustomStrategyStatusData
  custom_strategy_status_id: number
  contactId: number
}
type EffectResult = CustomStrategyStatus

export const updateContactStatusFx = createEffect<EffectParams, EffectResult>(
  async (obj: { data: UpdateCustomStrategyStatusData; custom_strategy_status_id: number }) => {
    // console.log("obj.value", obj.custom_strategy_status_id, "obj.data", obj.data)
    return customStrategyStatus.update({
      ...obj.data,
      custom_strategy_status_id: obj.custom_strategy_status_id,
    })
  }
)

$items.on(updateContactStatusFx.done, (state, { params, result }) => {
  // console.log("state", state)
  // console.log("params", params)
  // console.log("result", result)
  return state.map((item) => {
    // console.log("item", item)

    if (item.contact_id.contact_id === params?.contactId) {
      return { ...item, custom_strategy_status_id: result }
    }
    return item
  })
})

// console.log("$items", $items)
const $mapStatusToContactId = $items.map((items) => mapStatusToContactId(items))
const $countContactsInStatuses = $mapStatusToContactId.map((items) => {
  const result: CountContactsInStatuses = {}
  Object.keys(items).forEach((key) => {
    const status_id = items[+key].custom_strategy_status_id
    result[status_id] = (result[status_id] || 0) + 1
  })
  return result
})

//* Event
const oneUpdated = createEvent<number>()
const reloaded = createEvent()

//* Logic
// Get All
reset({
  clock: [$$activeStrategy.activeStrategyChanged, reloaded],
  target: [$items, $offset],
})

sample({
  clock: [$$activeStrategy.activeStrategyChanged, reloaded],
  source: {
    strategy_id: $$activeStrategy.$activeStrategyId,
    limit: $limit,
    offset: $offset,
  },
  target: requestSubmited,
})

sample({
  clock: request.done,
  source: $items,
  fn: (currentItems, response) => [...currentItems, ...response.items],
  target: $items,
})

sample({
  clock: request.done,
  source: $offset,
  fn: (offset, response) => offset + response.items.length,
  target: $offset,
})

sample({
  clock: request.done,
  source: {
    strategy_id: $$activeStrategy.$activeStrategyId,
    limit: $limit,
    offset: $offset,
  },
  filter: ({ limit }, response) => response.items.length === limit,
  target: requestSubmited,
})

// Get One
sample({
  clock: oneUpdated,
  source: $$activeStrategy.$activeStrategyId,
  fn: (strategy_id, contact_id) => ({ strategy_id, contact_id }),
  target: getOne.submited,
})

sample({
  clock: getOne.done,
  source: $items,
  fn: updateOneItem,
  target: $items,
})

export const $$contactCustomStrategyStatuses = {
  ...request,
  $items,
  $mapStatusToContactId,
  $countContactsInStatuses,
  oneUpdated,
  reloaded,
}
