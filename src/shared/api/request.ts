import axios, { AxiosRequestConfig } from 'axios'

export async function request<Data, Response>(
  url: string,
  config: AxiosRequestConfig<Data>
): Promise<Response> {
  const buildedConfig: AxiosRequestConfig<Data> = {
    withCredentials: true,
    ...config,
  }

  const buildedUrl = '/api/v1/' + url
  try {
    const response = await axios<Response>(buildedUrl, buildedConfig)

    return Promise.resolve(response.data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.response) {
      if (e.response.data) {
        return Promise.reject(e.response.data.detail as string)
      }
    }

    return Promise.reject('Неизвестная ошибка')
  }
}
