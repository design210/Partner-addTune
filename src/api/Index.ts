import axios from 'axios'
import { setInterceprors } from '@api/common/Interceptors'
export const baseURL = process.env.REACT_APP_API_URL as string
function createInstanceWithAuth(url: string, method: string, paramData?: any, params?: any, responseType?: any): any {
  const instance = axios.create({
    baseURL: baseURL,
    params: params,
    responseType: responseType,
  })

  switch (method) {
    case 'get':
      if (url === '/auth/refresh' || url === '/auth/logout') {
        return setInterceprors(instance, paramData, true).get(url)
      } else {
        return setInterceprors(instance, paramData).get(url)
      }
    case 'post':
      return setInterceprors(instance, paramData).post(url)
    case 'put':
      return setInterceprors(instance, paramData).put(url)
    case 'delete':
      return setInterceprors(instance, paramData).delete(url)
  }
}
export { createInstanceWithAuth }
