import { request } from './request'
import { createEffect } from 'effector'

interface RegisterData {
  firstName: string
  lastName: string
  login: string
  email: string
  phone: string
  password: string
  parentLogin: string
}

interface RegisterResponse {
  status: string
}

const register = createEffect<RegisterData, RegisterResponse, string>((data: RegisterData) =>
  request<RegisterData, RegisterResponse>('auth/register', { method: 'POST', data })
)

interface LoginData {
  email: string
  password: string
}

const login = createEffect<LoginData, RegisterResponse, string>((data: LoginData) =>
  request<LoginData, RegisterResponse>('auth/login', { method: 'POST', data })
)

export const auth = {
  register,
  login,
}
