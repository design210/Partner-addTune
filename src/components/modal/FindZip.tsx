import React from 'react'
import DaumPostcode from 'react-daum-postcode'
import { useSetRecoilState } from 'recoil'
import { ModalState } from '@modules/recoil/ModalRecoil'
import { zipState } from '@modules/recoil/MyProfile'

const FindZip = (): JSX.Element => {
  const setZip = useSetRecoilState(zipState)
  const setModalState = useSetRecoilState(ModalState)

  const handle = {
    selectAddress: (data: any) => {
      setZip({ address: data.address, zipCode: data.zonecode })
      setModalState({ status: false })
    },
  }

  return (
    <div>
      <DaumPostcode
        onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
        //autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
        //defaultQuery="판교역로 235" // 팝업을 열때 기본적으로 입력되는 검색어
      />
    </div>
  )
}

export default FindZip
