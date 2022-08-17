import { atom } from 'recoil'

export const dashboardStoreListState = atom<any>({
  key: 'dashboardStoreListBodyState',
  default: {
    header: {
      total: 0,
      stores: [],
    },
    content: [],
    totalElements: 0,
  },
})

export const storeListPage = atom<number>({
  key: 'storeListPage',
  default: 1,
})
