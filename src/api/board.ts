import { createInstanceWithAuth } from '@api/Index'
import errorLogic from '@api/common/errorLogic'
import { QueryFunctionContext } from 'react-query'

async function getNotice({ queryKey }: any) {
  const [key, data] = queryKey
  const param = {
    size: data.size,
    page: data.page,
    category: data.category,
  }
  try {
    const { data } = await createInstanceWithAuth('/support/notice', 'get', {}, param)
    return data
  } catch (error) {
    return errorLogic(error)
  }
}

async function getNoticeDetail(id: QueryFunctionContext<string | readonly unknown[]>) {
  try {
    const { data } = await createInstanceWithAuth(`/support/notice/${id.queryKey[1]}`, 'get', {}, {})
    return data
  } catch (error) {
    return errorLogic(error)
  }
}

async function getFaq({ queryKey }: any) {
  const [key, data] = queryKey
  const param = {
    size: data.size,
    page: data.page,
    category: data.category,
  }
  try {
    const { data } = await createInstanceWithAuth('/support/faq', 'get', {}, param)
    return data
  } catch (error) {
    return errorLogic(error)
  }
}

async function setContact(data: any) {
  const frm = new FormData()
  frm.append('type', data.type)
  frm.append('title', data.title)
  frm.append('content', data.content)
  if (data.files.length > 0) {
    Array.from(data.files).forEach((file: any) => {
      frm.append('files', file)
    })
  }
  try {
    const { data } = await createInstanceWithAuth('/support/inquire', 'post', frm, {})
    return data
  } catch (error) {
    return errorLogic(error)
  }
}

async function getMyContact({ queryKey }: any) {
  const [key, data] = queryKey
  const param = {
    size: data.size,
    page: data.page,
  }
  try {
    const { data } = await createInstanceWithAuth('/support/inquire', 'get', {}, param)
    return data
  } catch (error) {
    return errorLogic(error)
  }
}

async function getMyContactDetail(id: QueryFunctionContext<string | readonly unknown[]>) {
  try {
    const { data } = await createInstanceWithAuth(`/support/inquire/${id.queryKey[1]}`, 'get', {}, {})
    return data
  } catch (error) {
    return errorLogic(error)
  }
}

export { getNotice, getNoticeDetail, getFaq, setContact, getMyContact, getMyContactDetail }
