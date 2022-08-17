import type { AxiosResponse, AxiosError, AxiosRequestConfig, AxiosInstance, AxiosRequestTransformer } from 'axios'
import { getCookie } from '@utils/cookie'
export function setInterceprors(instance: AxiosInstance, data?: AxiosRequestTransformer, refresh?: boolean) {
  const accessToken = getCookie('accessToken')
  const refreshToken = getCookie('refreshToken')
  instance.interceptors.request.use(
    function (config: AxiosRequestConfig) {
      config.headers!['Content-Type'] = 'application/json; charset=utf-8'
      refresh ? (config.headers!['Authorization'] = `Bearer ${refreshToken}`) : (config.headers!['Authorization'] = `Bearer ${accessToken}`)
      config.data = data
      return config
    },
    function (error: AxiosError) {
      return Promise.reject(error)
    },
  )

  instance.interceptors.response.use(
    function (response: AxiosResponse) {
      if (response.status === 401) {
      }
      return response
    },
    function (error: AxiosError) {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data)
      }
      return Promise.reject(error.message)
    },
  )

  return instance
}
