import React from 'react'
import styles from '@style/Main.module.scss'
import { dashboardState } from '@modules/recoil/DashboardRecoil'
import { useRecoilValue } from 'recoil'
import { useTranslation } from 'react-i18next'
import { getCookie } from '@utils/cookie'
import userType from '@utils/userType'
const StoreStatus = (): JSX.Element => {
  const { t } = useTranslation()
  const dashboardData = useRecoilValue(dashboardState)
  const companyStoreStatus = dashboardData.data.companyStoreStatus
  const contractType = getCookie('contractType')
  const contractStatus: any = userType(contractType)
  return (
    <>
      {contractStatus.agentStatus ? (
        <>
          <h2>{t('storeStatus')}</h2>
          <ul className={`${styles.storeStatus} ${styles.mt12}`}>
            <li>
              <div className={`${styles.subject} ${styles.major}`}>{t('totalStore')}</div>
              <div className={`${styles.num} ${styles.major}`}>
                {companyStoreStatus.total.toLocaleString()}
                {t('few')}
              </div>
            </li>
            <li>
              <div className={styles.subject}>{t('ing')}</div>
              <div className={styles.num}>{companyStoreStatus.running.toLocaleString()}개</div>
            </li>
            <li>
              <div className={styles.subject}>{t('ready')}</div>
              <div className={styles.num}>{companyStoreStatus.ready.toLocaleString()}개</div>
            </li>
            <li>
              <div className={styles.subject}>{t('end')}</div>
              <div className={styles.num}>{companyStoreStatus.shutdown.toLocaleString()}개</div>
            </li>
          </ul>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default StoreStatus
