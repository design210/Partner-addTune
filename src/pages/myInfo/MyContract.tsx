import React from 'react'
import ErrorBoundary from '@components/common/ErrorBoundary'
import ContractDetail from '@components/myContract/ContractDetail'
import styles from '@style/myInfo/myInfo.module.scss'
const MyContract = (): JSX.Element => {
  return (
    <section className={`${styles.container} ${styles.subSpace} ${styles.mt30}`}>
      <ErrorBoundary>
        <ContractDetail />
      </ErrorBoundary>
    </section>
  )
}

export default MyContract
