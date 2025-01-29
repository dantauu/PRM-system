/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestFactory, RequestParams } from './request'
import { createStore, sample } from 'effector'
import { debug, reset } from 'patronum'

interface GetOneParams<Params, Done> extends RequestParams<Params, Done> {}

export function GetOneFactory<
  Params = void,
  Done = any,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Error = unknown,
  Item = Done,
>({ name, api, useDebug }: GetOneParams<Params, Item>) {
  const getName = (unit: string) => `get-one ${name} ${unit}`

  //* Request
  const request = RequestFactory({ name: `get-all ${name}`, api, useDebug })

  //* Stores
  const $item = createStore<Item | null>(null, { name: getName('items') })

  //* Logic
  // Reseted
  reset({
    clock: request.reseted,
    target: [$item],
  })

  // Done
  sample({
    clock: request.done,
    target: $item,
  })

  if (useDebug) {
    debug($item)
  }

  return {
    ...request,
    $item,
  }
}

export type GetOne = ReturnType<typeof GetOneFactory>
