import { atom } from 'recoil'
import { me, zipType, fileType, contractType } from '../../types/myInfo'
export const myProfileState = atom<me>({
  key: 'myProfileState',
  default: {
    companySid: '', // 고유코드
    nation: '', // 국가코드
    nationName: '', // 국가코드이름
    kind: '', // 업체종류코드
    kindName: '', // 업체종류이름
    name: '', // 업체명
    crNum: '', // 사업자등록번호
    btNum: '', // 법인번호
    ceo: '', // 대표
    industries: '', // 업종
    typeOfBusiness: '', // 업태
    zipCode: '', // 주소
    address1: '', // 주소
    address2: '', // 주소
    tel: '', // 전화
    email: '', // 메일
    bank: '', // 은행코드
    bankName: '', // 은행코드이름
    bankAccount: '', // 계좌
    bankAccountHolder: '', // 예금주
    approval: '', // 승인상태
    approvalName: '', // 승인상태
  },
})

export const zipState = atom<zipType>({
  key: 'zipState',
  default: {
    address: '',
    zipCode: '',
  },
})
export const modifyLoadingConfirm = atom<boolean>({
  key: 'modifyLoadingConfirm',
  default: false,
})

export const uploadFiles = atom<fileType[] | any>({
  key: 'uploadFiles',
  default: [],
})

export const deleteFileSid = atom<string>({
  key: 'deleteFileSid',
  default: '',
})

export const myContractState = atom<contractType>({
  key: 'myContractState',
  default: {
    companyName: '',
    companySid: '',
    files: [],
    kind: '',
    period: '',
    sid: '',
  },
})

export const modifyStatusState = atom<boolean>({
  key: 'modifyStatusState',
  default: false,
})
