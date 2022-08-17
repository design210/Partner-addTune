import styles from '@style/common/skeleton.module.scss'
import React from 'react'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
const Dashboard = (): JSX.Element => {
  return (
    <section className={`${styles.skeletonWrap} ${styles.mt60} ${styles.mb100}`}>
      <div className={`${styles.flex} ${styles.between}`}>
        <div>
          <Skeleton variant="text" width={230} height={27} animation="wave" />
          <Typography variant="h1" style={{ marginTop: '-15px' }}>
            <Skeleton width={170} animation="wave" />
          </Typography>
          <Skeleton variant="text" width={203} height={21} style={{ marginTop: '-12px' }} animation="wave" />
          <Skeleton variant="rectangular" width={728} height={245} style={{ marginTop: '10px', borderRadius: '10px' }} animation="wave" />
        </div>
        <div>
          <Skeleton variant="rectangular" width={440} height={343} style={{ borderRadius: '20px' }} animation="wave" />
        </div>
      </div>
      <div className={styles.mt50}>
        <Skeleton variant="text" width={80} height={27} />
        <ul className={`${styles.flex} ${styles.between} ${styles.mt10}`}>
          <li>
            <Skeleton variant="rectangular" width={285} height={76} style={{ borderRadius: '10px' }} animation="wave" />
          </li>
          <li>
            <Skeleton variant="rectangular" width={285} height={76} style={{ borderRadius: '10px' }} animation="wave" />
          </li>
          <li>
            <Skeleton variant="rectangular" width={285} height={76} style={{ borderRadius: '10px' }} animation="wave" />
          </li>
          <li>
            <Skeleton variant="rectangular" width={285} height={76} style={{ borderRadius: '10px' }} animation="wave" />
          </li>
        </ul>
      </div>
      <div className={styles.mt68}>
        <Skeleton variant="rectangular" height={60} style={{ borderRadius: '5px' }} animation="wave" />
      </div>
      <div className={`${styles.flex} ${styles.between} ${styles.mt34}`}>
        <div className={styles.dashboardLeft}>
          <Skeleton variant="text" width={50} height={27} animation="wave" />
          <Typography variant="h2" style={{ marginTop: '-10px' }}>
            <Skeleton width={250} animation="wave" />
          </Typography>
          <Skeleton variant="text" width={203} height={21} style={{ marginTop: '-10px' }} animation="wave" />
          <ul>
            <li className={`${styles.mt20} ${styles.flex} ${styles.alignCenter}`}>
              <div>
                <Skeleton variant="rectangular" width={201} height={103} animation="wave" />
              </div>
              <div className={styles.ml20}>
                <Skeleton variant="text" width={330} height={17} animation="wave" />
              </div>
            </li>
            <li className={`${styles.mt20} ${styles.flex} ${styles.alignCenter}`}>
              <div>
                <Skeleton variant="rectangular" width={201} height={103} animation="wave" />
              </div>
              <div className={styles.ml20}>
                <Skeleton variant="text" width={330} height={17} animation="wave" />
              </div>
            </li>
            <li className={`${styles.mt20} ${styles.flex} ${styles.alignCenter}`}>
              <div>
                <Skeleton variant="rectangular" width={201} height={103} animation="wave" />
              </div>
              <div className={styles.ml20}>
                <Skeleton variant="text" width={330} height={17} animation="wave" />
              </div>
            </li>
          </ul>
          <Skeleton variant="rectangular" width={692} height={40} style={{ marginTop: '20px' }} animation="wave" />
        </div>
        <div className={styles.dashboardRight}>
          <Skeleton variant="text" width={50} height={27} animation="wave" />
          <Typography variant="h2" style={{ marginTop: '-10px' }}>
            <Skeleton width={250} animation="wave" />
          </Typography>
          <Skeleton variant="text" width={203} height={21} style={{ marginTop: '-10px' }} animation="wave" />
          <Skeleton variant="text" width={441} height={21} style={{ marginTop: '15px' }} animation="wave" />
          <Skeleton variant="text" width={441} height={21} style={{ marginTop: '15px' }} animation="wave" />
          <Skeleton variant="text" width={441} height={21} style={{ marginTop: '15px' }} animation="wave" />
          <Skeleton variant="text" width={441} height={21} style={{ marginTop: '15px' }} animation="wave" />
          <Skeleton variant="text" width={441} height={21} style={{ marginTop: '15px' }} animation="wave" />
          <Skeleton variant="rectangular" width={441} height={40} style={{ marginTop: '20px' }} animation="wave" />
          <Skeleton variant="rectangular" width={441} height={136} style={{ marginTop: '50px' }} animation="wave" />
        </div>
      </div>
    </section>
  )
}

export default Dashboard
