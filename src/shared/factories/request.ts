/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEffect, createEvent, createStore, sample } from 'effector'
import { debug, reset, status } from 'patronum'

export interface RequestParams<Params, Done> {
  name: string

  api: (params: Params) => Promise<Done>

  useDebug?: boolean
}

export function RequestFactory<
  Params = void,
  Done extends Array<any> | any = Array<any>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Error = unknown,
>({ name, api, useDebug }: RequestParams<Params, Done>) {
  const getName = (unit: string) => `${name} ${unit}`

  //* API
  const apiFx = createEffect(getName('api-fx'), { handler: api })

  //* Stores
  const $params = createStore<Params | null>(null, { name: getName('params') })
  const $status = status(apiFx)
  const $wasLoaded = createStore<boolean>(false, { name: getName('was-loaded') })

  //* Events
  const submited = createEvent<Params>(getName('submited'))
  const reloaded = createEvent(getName('reloaded'))
  const done = apiFx.doneData
  const fail = apiFx.failData
  const reseted = createEvent()

  //* Logic
  // Reseted
  reset({
    clock: reseted,
    target: [$params, $wasLoaded],
  })

  // Submited
  $wasLoaded.on(submited, () => true)

  sample({
    clock: submited,
    filter: (params) => !!params,
    target: $params,
  })

  sample({
    clock: submited,
    source: $status,
    filter: (status) => status !== 'pending',
    fn: (_, params) => params,
    target: apiFx,
  })

  // Reload
  sample({
    clock: reloaded,
    source: { params: $params, status: $status },
    filter: ({ params, status }) => !!params && status !== 'pending',
    fn: ({ params }) => params as Params,
    target: apiFx,
  })

  if (useDebug) {
    debug(apiFx, $params, submited, reloaded)
  }

  return {
    $params,
    $status,
    $wasLoaded,

    submited,
    reloaded,
    done,
    fail,
    reseted,
  }
}

export type Request<Params = void, Done extends Array<any> | any = Array<any>> = ReturnType<
  typeof RequestFactory<Params, Done>
>
