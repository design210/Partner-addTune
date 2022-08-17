import React from 'react'
import styles from '@style/board/Board.module.scss'
import ErrorBoundary from '@components/common/ErrorBoundary'
import CalculateWrap from '@components/calculate/CalculateWrap'

const Calculate = (): JSX.Element => {
  return (
    <section className={`${styles.container} ${styles.subSpace}`}>
      <ErrorBoundary>
        <CalculateWrap />
      </ErrorBoundary>
    </section>
  )
}

export default Calculate
