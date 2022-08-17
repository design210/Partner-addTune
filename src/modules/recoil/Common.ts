import { atom } from 'recoil'

export const loadingFixed = atom<boolean>({
  key: 'loadingFixed',
  default: false,
})

export const contactPage = atom<number>({
  key: 'contactPage',
  default: 1,
})
