import React from 'react'
import styles from '@style/board/Board.module.scss'
import ErrorBoundary from '@components/common/ErrorBoundary'
import FaqList from '@components/faq/FaqList'

const Faq = (): JSX.Element => {
  return (
    <section className={`${styles.container} ${styles.subSpace} ${styles.mt30}`}>
      <ErrorBoundary>
        <FaqList />
      </ErrorBoundary>
    </section>
  )
}

export default Faq
