import { createInstanceWithAuth } from '@api/Index'
import errorLogic from '@api/common/errorLogic'
import { bankType } from '../types/myInfo'
async function myPofile() {
  try {
    const { data } = await createInstanceWithAuth('/my/profile', 'get', {}, {})
    return data
  } catch (error) {
    return errorLogic(error)
  }
}

async function fileDelete(id: string) {
  try {
    const { data } = await createInstanceWithAuth(`/file/${id}`, 'delete', {}, {})
    return data
  } catch (error) {
    return errorLogic(error)
  }
}

async function profileEdit(data: any) {
  const frm = new FormData()
  frm.append('nation', data.nation)
  frm.append('kind', data.kind)
  frm.append('name', data.name)
  frm.append('crNum', data.crNum)
  frm.append('btNum', data.btNum)
  frm.append('ceo', data.ceo)
  frm.append('industries', data.industries)
  frm.append('typeOfBusiness', data.typeOfBusiness)
  frm.append('zipCode', data.zipCode)
  frm.append('address1', data.address1)
  frm.append('address2', data.address2)
  frm.append('tel', data.tel)
  frm.append('email', data.email)
  frm.append('bank', data.bank)
  frm.append('bankAccount', data.bankAccount)
  frm.append('bankAccountHolder', data.bankAccountHolder)
  if (data.files.length > 0) {
    Array.from(data.files).forEach((file: any) => {
      frm.append('files', file)
    })
  }
  try {
    const { data } = await createInstanceWithAuth('/my/profile', 'put', frm, {})
    return data
  } catch (error) {
    return errorLogic(error)
  }
}

async function bankNmCk(data: bankType) {
  const numReplace = data.crNum.replaceAll('-', '')
  const paramData = {
    crNum: numReplace,
    bank: data.bank,
    bankAccount: data.bankAccount,
  }
  if (data.crNum === '') {
    alert('사업자 등록 번호를 입력해 주세요.')
    return
  }
  if (data.bankAccount === '') {
    alert('계좌번호를 입력해 주세요.')
    return
  }
  try {
    const { data } = await createInstanceWithAuth('/my/profile/certified', 'post', paramData, {})
    return data
  } catch (error) {
    return errorLogic(error)
  }
}

async function getMyContract() {
  try {
    const { data } = await createInstanceWithAuth('/my/profile/contract', 'get', {}, {})
    return data
  } catch (error) {
    return errorLogic(error)
  }
}

export { myPofile, fileDelete, profileEdit, bankNmCk, getMyContract }
