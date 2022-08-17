import React from 'react'
import NoticeDetailBody from '@components/notice/NoticeDetailBody'
import styles from '@style/board/Board.module.scss'
import ErrorBoundary from '@components/common/ErrorBoundary'
const NoticeDetail = (): JSX.Element => {
  return (
    <section className={`${styles.container} ${styles.subSpace}`}>
      <ErrorBoundary>
        <NoticeDetailBody />
      </ErrorBoundary>
    </section>
  )
}

export default NoticeDetail
