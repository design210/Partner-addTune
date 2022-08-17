interface myProfile {
  code: number
  message: null | string
  data: {
    me: me
    files?: Array<file>
  }
}
interface file {
  sid: string
  name: string
}
interface me {
  companySid?: string // 고유코드
  nation?: string // 국가코드
  nationName?: string // 국가코드이름
  kind?: string // 업체종류코드
  kindName?: string // 업체종류이름
  name?: string // 업체명
  crNum?: string // 사업자등록번호
  btNum?: string // 법인번호
  ceo?: string // 대표
  industries?: string // 업종
  typeOfBusiness?: string // 업태
  zipCode?: string // 주소
  address1?: string // 주소
  address2?: string // 주소
  tel?: string // 전화
  email?: string // 메일
  bank?: string // 은행코드
  bankName?: string // 은행코드이름
  bankAccount?: string // 계좌
  bankAccountHolder?: string // 예금주
  approval?: string
  approvalName?: string
}

interface bankType {
  crNum: string
  bank: string
  bankAccount: string
}

interface zipType {
  address: string
  zipCode: string
}

interface fileType {
  sid: string
  name: string
}

interface contractType {
  companyName: string
  companySid: string
  files: Array<contractFiles>
  kind: string
  period: string
  sid: string
}

interface contractFiles {
  name: string
  sid: string
}
export type { myProfile, file, me, bankType, zipType, fileType, contractType }
