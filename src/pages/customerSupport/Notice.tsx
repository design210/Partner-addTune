import React from 'react'
import styles from '@style/board/Board.module.scss'
import ErrorBoundary from '@components/common/ErrorBoundary'
import NoticeList from '@components/notice/NoticeList'

const Notice = (): JSX.Element => {
  return (
    <section className={`${styles.container} ${styles.subSpace} ${styles.mt30}`}>
      <ErrorBoundary>
        <NoticeList />
      </ErrorBoundary>
    </section>
  )
}

export default Notice
