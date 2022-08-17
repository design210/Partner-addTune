import { createInstanceWithAuth } from '@api/Index'
import errorLogic from '@api/common/errorLogic'
// login
async function signIn(initialState: { email: string; pwd: string }) {
  try {
    const paramData = {
      email: initialState.email,
      pwd: initialState.pwd,
    }
    const { data } = await createInstanceWithAuth('/auth/login', 'post', paramData, {})
    return data
  } catch (error) {
    return errorLogic(error)
  }
}
//logout
async function logOut() {
  try {
    const { data } = await createInstanceWithAuth('/auth/logout', 'get', {}, {})
    return data
  } catch (error) {
    return errorLogic(error)
  }
}

export { signIn, logOut }
