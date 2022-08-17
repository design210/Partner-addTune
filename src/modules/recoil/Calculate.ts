import { atom } from 'recoil'
import { calculateAll, monthsDetails, useful } from '../../types/calculate'
export const monthsState = atom<string>({
  key: 'monthsState',
  default: 'all',
})

export const yearState = atom<string>({
  key: 'yearState',
  default: '',
})

export const calculateAllState = atom<calculateAll>({
  key: 'calculateAllState',
  default: {
    total: 0,
    deposits: [
      {
        sid: 0, // 고유코드
        month: 0, // 월
        carryoverPrice: 0, // 이월 누적 금액
        price: 0, // 정산 금액
        taxPrice: 0, // 세금합계
        paymentPrice: 0, // 실 지급 금액
        diffPrice: 0, // 지급 후 차액
        status: '', // 상태
        statusName: '',
      },
    ],
    years: [],
  },
})

export const monthsDetailsState = atom<monthsDetails>({
  key: 'monthsDetailsState',
  default: {
    deposit: {
      carryoverPrice: 0,
      diffPrice: 0,
      incomeTaxPrice: 0,
      localTaxPrice: 0,
      month: 0,
      paymentPrice: 0,
      price: 0,
      status: '',
      statusName: '',
      taxPrice: 0,
      companyPaymentKind: '',
      companyPaymentKindName: '',
    },
    storeMonthSettlement: {
      total: 0,
      list: [],
    },
    storeAgentMonthSettlement: {
      total: 0,
      list: [],
    },
    storeAgent2022MonthSettlement: {
      total: 0,
      list: [],
    },
    totals: {
      cashTotal: 0,
      rentFeeTotal: 0,
      storeAgentTotal: 0,
      storeMonthTotal: 0,
      total: 0,
    },
  },
})

export const usefulState = atom<useful>({
  key: 'usefulState',
  default: {
    dayData: {
      list: [],
      most: {
        key: '',
        value: 0,
      },
    },
    overallData: {
      ageMost: {
        key: '',
        percent: 0,
        value: 0,
      },
      genderMost: {
        key: '',
        percent: 0,
        value: 0,
      },
      list: [],
      monthTraffic: 0,
      stayTraffic: 0,
    },
    timeData: {
      list: [],
      most: {
        key: '',
        value: 0,
      },
    },
    topData: {
      business: [],
      zone: [],
    },
  },
})
