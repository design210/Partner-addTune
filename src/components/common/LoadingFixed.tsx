import React from 'react'
import CircularProgress from '@components/common/CircleProgress'
import styles from '@style/common/common.module.scss'
const LoadingFixed = (): JSX.Element => {
  return (
    <div className={styles.dim}>
      <div className={styles.circularProgressWrap}>
        <CircularProgress size={100} thickness={5} />
      </div>
    </div>
  )
}

export default LoadingFixed
