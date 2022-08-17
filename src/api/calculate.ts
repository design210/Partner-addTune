import { createInstanceWithAuth } from '@api/Index'
import errorLogic from '@api/common/errorLogic'
import { QueryFunctionContext } from 'react-query'

async function getCalculateAll(context: QueryFunctionContext<string | readonly unknown[]>) {
  const params = {
    year: context.queryKey[1],
  }
  try {
    const { data } = await createInstanceWithAuth(`/my/settlement`, 'get', {}, params)
    return data
  } catch (error) {
    return errorLogic(error)
  }
}

async function getCalculateMonthsDetail(context: QueryFunctionContext<string | readonly unknown[]>) {
  const year = context.queryKey[1]
  const months = context.queryKey[2]
  try {
    const { data } = await createInstanceWithAuth(`/my/settlement/detail/${year}/${months}`, 'get', {}, {})
    return data
  } catch (error) {
    return errorLogic(error)
  }
}

async function getStatement(context: QueryFunctionContext<string | readonly unknown[]>) {
  const year = context.queryKey[1]
  const months = context.queryKey[2]
  try {
    const { data } = await createInstanceWithAuth(`/my/settlement/detail/${year}/${months}/statement`, 'get', {}, {})
    return data
  } catch (error) {
    return errorLogic(error)
  }
}

async function getBeneficial(context: QueryFunctionContext<string | readonly unknown[]>) {
  const year = context.queryKey[1]
  const months = context.queryKey[2]
  try {
    const { data } = await createInstanceWithAuth(`/my/settlement/detail/${year}/${months}/useful`, 'get', {}, {})
    return data
  } catch (error) {
    return errorLogic(error)
  }
}

export { getCalculateAll, getCalculateMonthsDetail, getStatement, getBeneficial }
