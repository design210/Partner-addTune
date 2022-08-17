import React, { Suspense } from 'react'
import styles from '@style/myInfo/myInfo.module.scss'
import MyProfile from '@components/myInfo/MyProfile'
import MyInfo from '@skeletons/MyInfo'
import ErrorBoundary from '@components/common/ErrorBoundary'
const Profile = (): JSX.Element => {
  return (
    <section className={`${styles.container} ${styles.subSpace} ${styles.mt30}`}>
      <Suspense fallback={<MyInfo />}>
        <ErrorBoundary>
          <MyProfile />
        </ErrorBoundary>
      </Suspense>
    </section>
  )
}

export default Profile
