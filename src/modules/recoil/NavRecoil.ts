import { atom } from 'recoil'
export const NavState = atom({
  key: 'NavState',
  default: -1,
})

export const NavSubState = atom({
  key: 'NavSubState',
  default: -1,
})

export const NavActive = atom({
  key: 'NavActive',
  default: true,
})

export const NavData = atom<any>({
  key: 'NavData',
  default: [],
})
