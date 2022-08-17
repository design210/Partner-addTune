import { atom } from 'recoil'
interface stateType {
  open: boolean
  vertical: 'bottom' | 'top'
  horizontal: 'center' | 'left' | 'right'
}
export const toastStatus = atom<stateType>({
  key: 'toastStatus',
  default: {
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  },
})
