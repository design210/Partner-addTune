import React from 'react'
import styles from '@style/common/skeleton.module.scss'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

const Useful = (): JSX.Element => {
  return (
    <>
      <section className={`${styles.skeletonWrap} ${styles.mt80} ${styles.mb100} ${styles.pl50} ${styles.pr50}`}>
        <Typography variant="h2" style={{ marginTop: '70px', textAlign: 'center' }}>
          <Skeleton width={80} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
        </Typography>
        <Typography variant="h2" style={{ textAlign: 'center' }}>
          <Skeleton width={300} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
          <Skeleton width={350} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
        </Typography>
        <Typography variant="h3" style={{ textAlign: 'center' }}>
          <Skeleton width={200} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
        </Typography>
        <Skeleton variant="text" width={120} height={17} animation="wave" style={{ marginTop: '10px', marginLeft: 'auto', marginRight: 'auto' }} />
        <Typography variant="h3" style={{ marginTop: '40px', textAlign: 'center' }}>
          <Skeleton width={200} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
          <Skeleton width={270} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
        </Typography>
        <Typography variant="h3" style={{ marginTop: '20px', textAlign: 'center' }}>
          <Skeleton width={200} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
          <Skeleton width={270} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
        </Typography>
      </section>
      <section className={`${styles.skeletonWrap}`}>
        <div className={`${styles.flex} ${styles.between}`}>
          <Skeleton variant="rectangular" width={590} height={507} style={{ marginTop: '10px', borderRadius: '10px' }} animation="wave" />
          <Skeleton variant="rectangular" width={590} height={507} style={{ marginTop: '10px', borderRadius: '10px' }} animation="wave" />
        </div>
      </section>
    </>
  )
}

export default Useful
