/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestFactory, RequestParams } from './request'
import { createStore, sample } from 'effector'
import { debug, reset } from 'patronum'

interface GetAllParams<Params, Done> extends RequestParams<Params, Done> {}

export function GetAllFactory<
  Params = void,
  Done extends Array<any> = Array<any>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Error = unknown,
  Item = Done extends Array<infer ItemType> ? ItemType : any,
>({ name, api, useDebug }: GetAllParams<Params, Item[]>) {
  const getName = (unit: string) => `get-all ${name} ${unit}`

  //* Request
  const request = RequestFactory({ name: `get-all ${name}`, api, useDebug })

  //* Stores
  const $items = createStore<Item[]>([], { name: getName('items') })

  //* Logic
  // Reseted
  reset({
    clock: request.reseted,
    target: [$items],
  })

  // Done
  sample({
    clock: request.done,
    target: $items,
  })

  if (useDebug) {
    debug($items)
  }

  return {
    ...request,
    $items,
  }
}

export type GetAll = ReturnType<typeof GetAllFactory>
