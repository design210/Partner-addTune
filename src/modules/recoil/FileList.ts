import { atom } from 'recoil'

export const uploadFileListData = atom<any>({
  key: 'uploadFileListData',
  default: [],
  dangerouslyAllowMutability: true,
})
