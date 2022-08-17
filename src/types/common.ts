interface mutationError {
  code: number
  message: null | string
  data: null | any
}
interface responseType {
  code: number
  message: null | string
  data: null | any
}
interface sysCode {
  code: number
  message: null | string
  data: Array<sysCodeArray>
}
interface sysCodeArray {
  sid: string
  name: string
}

interface SelectPropType {
  value: number | string
  change: any
  id: string
  width: number
  error?: boolean
}
export type { mutationError, sysCode, sysCodeArray, SelectPropType, responseType }
