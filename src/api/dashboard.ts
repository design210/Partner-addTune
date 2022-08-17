import { createInstanceWithAuth } from '@api/Index'
import errorLogic from '@api/common/errorLogic'

async function dashboard() {
  try {
    const { data } = await createInstanceWithAuth('/dashboard', 'get', {}, {})
    return data
  } catch (error) {
    return errorLogic(error)
  }
}

async function myStoreList({ queryKey }: { queryKey: any }) {
  const { size, page } = queryKey[1]
  const params = {
    size,
    page,
  }
  try {
    const { data } = await createInstanceWithAuth('/dashboard/ad', 'get', {}, params)
    return data
  } catch (error) {
    return errorLogic(error)
  }
}
export { dashboard, myStoreList }
