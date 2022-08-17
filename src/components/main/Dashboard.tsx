import styles from '@style/Main.module.scss'
import React from 'react'
import Calculate from '@components/main/Calculate'
import PrivateInfo from '@components/main/PrivateInfo'
import MainBanner from '@components/main/MainBanner'
import Press from '@components/main/Press'
import Notice from '@components/main/Notice'
import DownloadBanner from '@components/main/DownloadBanner'
import StoreStatus from '@components/main/StoreStatus'
import { useQuery } from 'react-query'
import { dashboard } from '@api/dashboard'
import { dashboardType } from '../../types/main'
import { useSetRecoilState } from 'recoil'
import { dashboardState } from '@modules/recoil/DashboardRecoil'
const Dashboard = (): JSX.Element => {
  const setMainDashboard = useSetRecoilState(dashboardState)
  const { refetch } = useQuery<dashboardType, Error>('dashboard', async () => await dashboard(), {
    suspense: true,
    enabled: true,
    staleTime: 60 * 60 * 1000,
    onSuccess: data => {
      data.message === 'reFetch' ? refetch() : setMainDashboard(data)
    },
  })
  return (
    <article className={styles.container}>
      <section className={styles.main}>
        <div className={styles.column}>
          {/* 메인 정보 */}
          <Calculate />
          {/* 업체 정보 */}
          <PrivateInfo />
        </div>
      </section>
      {/* 스토어 현황 */}
      <section className={`${styles.storeStatusWrap} ${styles.mt50}`}>
        <StoreStatus />
      </section>
      {/* 메인 배너 */}
      <section className={`${styles.mainBannerWrap} ${styles.mt68}`}>
        <MainBanner />
      </section>
      <section className={`${styles.bottomGrid} ${styles.mt34}`}>
        {/* 소식 */}
        {/*<Press />*/}
        <section className={styles.bottomRightGrid}>
          {/* 공지사항 */}
          <Notice />
        </section>
        {/* 다운로드 배너 */}
        <DownloadBanner />
      </section>
    </article>
  )
}

export default Dashboard
