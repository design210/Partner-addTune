import { createInstanceWithAuth } from '@api/Index'
import errorLogic from '@api/common/errorLogic'
import { QueryFunctionContext } from 'react-query'

async function common(id: QueryFunctionContext<string | readonly unknown[]>) {
  try {
    const { data } = await createInstanceWithAuth(`/syscode/parent/${id.queryKey[1]}`, 'get', {}, {})
    return data
  } catch (error) {
    return errorLogic(error)
  }
}

async function fileView(id: QueryFunctionContext<string | readonly unknown[]>) {
  try {
    const { data } = await createInstanceWithAuth(`/file/view/${id.queryKey[1]}`, 'get', {}, {}, 'arraybuffer')
    return data
  } catch (error) {
    return errorLogic(error)
  }
}
export { common, fileView }
