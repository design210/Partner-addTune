import React from 'react'
import styles from '@style/calculate/calculate.module.scss'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

const AgentInfo = ({ year, months }: { year: string; months: string }): JSX.Element => {
  const { t } = useTranslation()
  return (
    <section className={`${styles.passsWrap} ${styles.mt120}`}>
      <div className={styles.iconWrap}>
        <span>
          <img src={`${process.env.PUBLIC_URL}/assets/img/img_bulb.svg`} alt="" />
          {t('storeAgent')}
        </span>
      </div>
      <h1 className={styles.mt25}>
        {t('storeAgentTitle1')}
        <br />
        {t('storeAgentTitle1-1')}
      </h1>
      <h2 className={styles.mt15}>{t('storeAgentTitle2')}</h2>
      <p className={`${styles.mt15} ${styles.date}`}>
        {year}.{months}.01 ~{year}.{months}.{dayjs(`${year}-${months}`).daysInMonth()}
      </p>
      <p className={`${styles.mt25} ${styles.center} ${styles.mb25}`}>
        <img src={`${process.env.PUBLIC_URL}/assets/img/double.svg`} alt="" />
      </p>
      <p className={`${styles.mt15} ${styles.age}`}>
        {t('storeAgentText1')} <strong>{t('storeAgentText2')}</strong>
        {t('storeAgentText3')}
      </p>
      <p className={`${styles.mt15} ${styles.age}`}>
        {t('storeAgentText4')} <strong>{t('storeAgentText5')}</strong>
        {t('storeAgentText6')} <strong>{t('storeAgentText7')}</strong>
        {t('storeAgentText8')}
      </p>
    </section>
  )
}

export default AgentInfo
