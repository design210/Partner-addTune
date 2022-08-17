import React from 'react'
import Skeleton from '@mui/material/Skeleton'
import styles from '@style/common/skeleton.module.scss'

const Specificate = (): JSX.Element => {
  return (
    <section className={`${styles.skeletonWrap} ${styles.mb100} ${styles.pl50} ${styles.pr50}`}>
      <Skeleton variant="rectangular" width={600} height={1000} style={{ marginTop: '80px', borderRadius: '10px', marginLeft: 'auto', marginRight: 'auto' }} animation="wave" />
    </section>
  )
}

export default Specificate
