import React from 'react'
import styles from '@style/myInfo/myInfo.module.scss'
import ErrorBoundary from '@components/common/ErrorBoundary'
import News from '@components/info/News'

const Suggestion = (): JSX.Element => {
  return (
    <section className={`${styles.container} ${styles.subSpace}`}>
      <ErrorBoundary>
        <News />
      </ErrorBoundary>
    </section>
  )
}

export default Suggestion
