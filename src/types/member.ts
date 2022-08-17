interface loginResType {
  code: number
  message: string
  data: {
    access: string
    refreshExpire: number
    refresh: string
    tokenType: string
    contractList: Array<string>
  }
}

export type { loginResType }
