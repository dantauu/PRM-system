import { Communication } from '..'
import { request } from '@/shared/api/request'
import { createEffect } from 'effector'

export const getAll = async () => request<never, Communication[]>('communications/', {})
