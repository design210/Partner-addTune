import { atom } from 'recoil'
interface type {
  status: boolean
  confirm?: boolean
  title?: string | JSX.Element
  titleColumn2?: string
  width?: number
  content?: string
  closeBtn?: boolean
  element?: JSX.Element
}
export const ModalState = atom<type>({
  key: 'ModalState',
  default: {
    status: false,
    confirm: false,
    title: '',
    titleColumn2: '',
    width: 0,
    closeBtn: false,
    content: '',
    element: <></>,
  },
})
