/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestFactory, RequestParams } from './request'

interface CreateParams<Params, Item> extends RequestParams<Params, Item> {}

export function CreateFactory<
  Params = void,
  Done = any,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Error = unknown,
  Item = Done,
>({ name, api, useDebug }: CreateParams<Params, Item>) {
  //* Request
  const request = RequestFactory({ name: `create ${name}`, api, useDebug })

  return request
}

export type Create = ReturnType<typeof CreateFactory>
