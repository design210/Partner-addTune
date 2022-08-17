interface calculateAll {
  total: number
  deposits: Array<deposits>
  years: Array<string>
}
interface deposits {
  sid: number // 고유코드
  month: number // 월
  carryoverPrice: number // 이월 누적 금액
  price: number // 정산 금액
  taxPrice: number // 세금합계
  paymentPrice: number // 실 지급 금액
  diffPrice: number // 지급 후 차액
  status: string // 상태
  statusName: string
}
interface monthsDetails {
  deposit: {
    month: number // 월
    carryoverPrice: number // 이월 누적
    price: number // 총 정산 금액
    incomeTaxPrice: number // 소득세
    localTaxPrice: number // 지방세
    taxPrice: number // 세금합계
    paymentPrice: number // 실 지급금액
    diffPrice: number // 지급 후 차액
    status: string // 상태코드
    statusName: string // 상태
    companyPaymentKind: string
    companyPaymentKindName: string
  }
  storeMonthSettlement: {
    total: number
    list: Array<storeCalcList>
  }
  storeAgentMonthSettlement: {
    total: number
    list: Array<storeCalcList>
  }
  storeAgent2022MonthSettlement: {
    total: number
    list: Array<storeCalcList>
  }
  totals: {
    cashTotal: number
    storeAgentTotal: number
    storeMonthTotal: number
    rentFeeTotal: number
    total: number
  }
}

interface storeCalcList {
  companyStoreSid: string // 스토어 고유코드
  companyStoreName: string // 스토어이름
  kind: string // 계약 종류
  salePrice: number // 월 광고 정산금액
  fee: number // 수수료
  price: number // 정산금액
  rentFee: number //임대료
  storeSaleList: Array<storeSaleList>
}

interface storeSaleList {
  buyPrice: number
  period: string
  price: number
  sid: number
  title: string
}

interface useful {
  dayData: {
    list: Array<usefulList>
    most: {
      key: string
      value: number
    }
  }
  overallData: {
    ageMost: {
      key: string
      percent: number
      value: number
    }
    genderMost: {
      key: string
      percent: number
      value: number
    }
    list: Array<usefulList>
    monthTraffic: number
    stayTraffic: number
  }
  timeData: {
    list: Array<usefulList>
    most: {
      key: string
      value: number
    }
  }
  topData: {
    business: Array<usefulList>
    zone: Array<usefulList>
  }
}

interface usefulList {
  key: string
  value: number
}
export type { calculateAll, deposits, monthsDetails, useful }
