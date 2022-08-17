interface dashboardType {
  code: number
  message: string
  data: {
    companyStoreStatus: {
      // 스토어 현황
      total: number // 전체
      ready: number // 운영 준비
      shutdown: number // 운영 종료
      running: number // 운영 중
    }
    contract: {
      // 나의 계약서
      period: string // 파트너 기간
      kind: string // 파트너 유형
      companySid: string // 업체 코드
      companyName: string // 업체명
    }
    me: {
      // 내 정보
      companyPersonTel: string // 전화번호
      companySid: string // 업체코드
      companyName: string // 업체명
      companyCrNum: string // 사업자등록번호
      companyBtNum: string // 법인번호
      companyCeo: string // 대표자명
      companyZipCode: string // 주소
      companyAddress1: string // 주소
      companyAddress2: string // 주소
    }
    settlementDeposit: {
      // 정산 내역
      year: number // 년
      month: number // 월
      price: number // 실 지급 금액
    }
    notice: Array<noticeType>
  }
}

interface noticeType {
  sid: number
  title: string
}

export type { dashboardType }
