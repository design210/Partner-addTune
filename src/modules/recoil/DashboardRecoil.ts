import { atom } from 'recoil'
export const dashboardState = atom({
  key: 'dashboardState',
  default: {
    code: 0,
    message: '',
    data: {
      companyStoreStatus: {
        // 스토어 현황
        ready: 0, // 운영 준비
        running: 0, // 운영 중
        shutdown: 0, // 운영 종료
        total: 0, // 전체
      },
      contract: {
        // 나의 계약서
        period: '', // 파트너 기간
        kind: '', // 파트너 유형
        companySid: '', // 업체 코드
        companyName: '', // 업체명
      },
      me: {
        // 내 정보
        companyPersonTel: '', // 전화번호
        companySid: '', // 업체코드
        companyName: '', // 업체명
        companyCrNum: '', // 사업자등록번호
        companyBtNum: '', // 법인번호
        companyCeo: '', // 대표자명
        companyZipCode: '', // 주소
        companyAddress1: '', // 주소
        companyAddress2: '', // 주소
      },
      settlementDeposit: {
        // 정산 내역
        year: 0, // 년
        month: 0, // 월
        price: 0, // 실 지급 금액
      },
      notice: [{ sid: 0, title: '' }],
    },
  },
})
