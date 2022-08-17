import React from 'react'
import styles from '@style/calculate/calculate.module.scss'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
const StoreInfo = ({ year, months }: { year: string; months: string }): JSX.Element => {
  const { t } = useTranslation()
  return (
    <section className={styles.passsWrap}>
      <div className={styles.iconWrap}>
        <span>
          <img src={`${process.env.PUBLIC_URL}/assets/img/img_bulb.svg`} alt="" />
          {t('store')}
        </span>
      </div>
      <h1 className={styles.mt25}>
        {t('storeAgentTitle1')}
        <br />
        {t('storeTitle1')}
      </h1>
      <h2 className={styles.mt15}>{t('storeAgentTitle2')}</h2>
      <p className={`${styles.mt15} ${styles.date}`}>
        {year}.{months}.01 ~{year}.{months}.{dayjs(`${year}-${months}`).daysInMonth()}
      </p>
      <p className={`${styles.mt25} ${styles.center} ${styles.mb25}`}>
        <img src={`${process.env.PUBLIC_URL}/assets/img/double.svg`} alt="" />
      </p>
      <p className={`${styles.mt15} ${styles.age}`}>
        <strong>{t('storeText1')}</strong>
        {t('storeText2')}
        <br />
        {t('storeText3')}
      </p>
      <p className={`${styles.mt15} ${styles.age}`}>
        <strong>{t('storeText4')}</strong>
        {t('storeText5')}
        <br />
        {t('storeText6')}
      </p>
    </section>
  )
}

export default StoreInfo
