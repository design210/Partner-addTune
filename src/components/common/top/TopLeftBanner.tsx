import styles from '@style/common/top.module.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
const TopLeftBanner = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <>
      <div className={styles.textWrap}>
        <p className={styles.customer}>{t('customerCenter')}</p>
        <p className={styles.tel}>1833-3055</p>
      </div>
    </>
  )
}

export default React.memo(TopLeftBanner)
