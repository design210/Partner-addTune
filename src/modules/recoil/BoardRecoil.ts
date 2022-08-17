import { atom } from 'recoil'
import { contactDetailDataType, noticeDetailDataType } from '../../types/board'
export const noticeListState = atom<any>({
  key: 'noticeListState',
  default: {
    content: [],
  },
})

export const noticeDetailState = atom<noticeDetailDataType>({
  key: 'noticeDetailState',
  default: {
    categoryNames: '',
    categorys: '',
    content: '',
    createName: '',
    createdAt: '',
    sid: 0,
    title: '',
    files:[]
  },
})

export const contactDetailState = atom<contactDetailDataType>({
  key: 'contactDetailState',
  default: {
    answer: '',
    answerDate: '',
    content: '',
    date: '',
    files: [],
    sid: 0,
    status: '',
    statusName: '',
    title: '',
    type: '',
  },
})

export const faqListState = atom<any>({
  key: 'faqListState',
  default: {
    content: [],
  },
})

export const contactTab = atom<boolean>({
  key: 'contactTab',
  default: true,
})

export const contactListTab = atom<boolean>({
  key: 'contactListTab',
  default: true,
})

export const contactListState = atom<any>({
  key: 'contactListState',
  default: {
    content: [],
  },
})
