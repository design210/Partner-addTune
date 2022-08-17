import React from 'react'
import styles from '@style/board/Board.module.scss'
import ErrorBoundary from '@components/common/ErrorBoundary'
import ContactWrap from '@components/contact/ContactWrap'

const Contact = (): JSX.Element => {
  return (
    <section className={`${styles.container} ${styles.subSpace} ${styles.mt30}`}>
      <ErrorBoundary>
        <ContactWrap />
      </ErrorBoundary>
    </section>
  )
}

export default Contact
