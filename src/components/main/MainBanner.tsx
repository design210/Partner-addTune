import styles from '@style/Main.module.scss'
/* 모달 관련 import */
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ModalState } from '@modules/recoil/ModalRecoil'
import React from 'react'
import MyStoreList from '@components/modal/myStoreList/MyStoreList'
import { dashboardState } from '@modules/recoil/DashboardRecoil'
import { useTranslation } from 'react-i18next'
import { getCookie } from '@utils/cookie'
import userType from '@utils/userType'
const MainBanner: React.FC = (): JSX.Element => {
  const { t } = useTranslation()
  const setModalState = useSetRecoilState(ModalState)
  const dashboardData = useRecoilValue(dashboardState)
  const me = dashboardData.data.me
  const openModal = (): void => {
    setModalState({
      status: true,
      title: `${me.companyName} ${t('yourStore')}`,
      titleColumn2: t('playAd'),
      width: 620,
      closeBtn: true,
      confirm: false,
      element: <MyStoreList />,
    })
  }
  const contractType = getCookie('contractType')
  const contractStatus: any = userType(contractType)
  return (
    <>
      {contractStatus.storeStatus ? (
        <section className={styles.mainBanner}>
          <h2>{t('nowPlay')}</h2>
          <button type="button" onClick={openModal}>
            {t('detailViewMove')}
          </button>
        </section>
      ) : (
        <></>
      )}
    </>
  )
}

export default MainBanner
