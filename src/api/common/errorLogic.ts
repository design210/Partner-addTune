import { createInstanceWithAuth } from '@api/Index'
import { removeCookie, setCookie } from '@utils/cookie'

async function sendRefreshToken() {
  try {
    const { data } = await createInstanceWithAuth('/auth/refresh', 'get', {}, {})
    setCookie('accessToken', data.data.access)
  } catch (error: any) {
    if (error.code === 480 || error.code === 482) {
      removeCookie('accessToken')
      removeCookie('refreshToken')
      alert('토큰 만료 : 다시 로그인해주세요')
    }
    throw new Error(JSON.stringify(error))
  }
}

// @ts-ignore
export default async function errorLogic(error: any) {
  if (error.code === 480) {
    try {
      await sendRefreshToken()
      return { message: 'reFetch' }
    } catch (error: any) {
      console.log(error)
    }
  } else {
    throw new Error(JSON.stringify(error))
  }
}
