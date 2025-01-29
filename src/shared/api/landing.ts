import { request } from './request'
import { createEffect } from 'effector'

export interface Landing {
  phone: string
  vk: string
  instagram: string
  telegram: string
  youtube: string
  about: string
  youtube_video: string
}

export interface LandingRef {
  user_id: number
  first_name: string
  last_name: string
  phone: string
  avatar: string
  about: string
  vk: string
  instagram: string
  telegram: string
  youtube: string
  youtube_video: string
}

// Get

type GetResponse = Landing

const get = createEffect(() => request<never, GetResponse>('landings/', { method: 'GET' }))

// Get By Login

interface GetByLoginData {
  login: string
}

type GetByLoginResponse = LandingRef

const getByLogin = createEffect(({ login }: GetByLoginData) =>
  request<never, GetByLoginResponse>(`landings/${login}`, { method: 'GET' })
)

// Update

type UpdateData = Landing

interface UpdateResponse {
  status: string
}

const update = createEffect<UpdateData, UpdateResponse, string>((data: UpdateData) =>
  request<UpdateData, UpdateResponse>(`landings/`, { method: 'PUT', data })
)

export const landing = {
  get,
  getByLogin,
  update,
}
