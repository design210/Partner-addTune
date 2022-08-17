import React from 'react'
import styles from '@style/calculate/calculate.module.scss'
import BarChart from '@components/chart/BarChart'
import { useRecoilValue } from 'recoil'
import { usefulState } from '@modules/recoil/Calculate'
import { useTranslation } from 'react-i18next'

const Statistics = (): JSX.Element => {
  const { t } = useTranslation()
  const { dayData, timeData, overallData } = useRecoilValue(usefulState)
  let dayValue: any[]
  dayValue = []
  let dayKey: any[]
  dayKey = []
  dayData.list.forEach(ele => {
    dayKey.push(ele.key)
    dayValue.push(ele.value)
  })
  let timeKey: any[]
  timeKey = []
  let timeValue: any[]
  timeValue = []
  timeData.list.forEach(ele => {
    timeKey.push(ele.key)
    timeValue.push(ele.value)
  })
  let overallKey: any[]
  overallKey = []
  let overalValue: any[]
  overalValue = []
  overallData.list.forEach(ele => {
    overallKey.push(ele.key)
    overalValue.push(ele.value)
  })

  return (
    <>
      <section className={`${styles.flex} ${styles.between} ${styles.mt40}`}>
        <section className={styles.dataWrap}>
          <h3 className={styles.mb60}>
            {t('monthsAverage')}{' '}
            <span>
              {dayData.most.key}
              {t('day')}
            </span>
            {t('e')}
            <br />
            {t('passage')}
          </h3>
          <div className={styles.barChartWrap}>
            <BarChart graphData={dayValue} label={dayKey} />
          </div>
        </section>
        <section className={styles.dataWrap}>
          <h3 className={styles.mb60}>
            {t('monthsAverage')}{' '}
            <span>
              {timeData.most.key}
              {t('hour')}
            </span>{' '}
            {t('timeZone')}
            <br />
            {t('passage')}
          </h3>
          <div className={styles.barChartWrap}>
            <BarChart graphData={timeValue} label={timeKey} />
          </div>
        </section>
      </section>
      <section className={`${styles.dataAgeWrap}`}>
        <h3>
          {t('monthsAverage')} <span>{overallData.monthTraffic.toLocaleString()}</span>
          {t('passPerson')}
          <br />
          {overallData.stayTraffic.toLocaleString()}
          {t('stay')}
        </h3>
        <h4 className={styles.mt10}>
          {t('major')}
          <span>
            &nbsp;{overallData.genderMost.key}, {overallData.ageMost.key}&nbsp;
          </span>
          {t('many')}
        </h4>
        <div className={`${styles.flex} ${styles.between} ${styles.mt30}`}>
          <div className={styles.gender}>
            <div className={overallData.genderMost.key === t('male') ? `${styles.female}` : `${styles.male} ${styles.big}`}>{overallData.genderMost.key === t('male') ? t('female') : t('male')}</div>
            <div className={overallData.genderMost.key === t('male') ? `${styles.male} ${styles.big}` : `${styles.female}`}>
              {overallData.genderMost.key}
              <p>{overallData.genderMost.percent}%</p>
            </div>
          </div>
          <div className={styles.barChartWrap}>
            <BarChart graphData={overalValue} label={overallKey} />
          </div>
        </div>
      </section>
    </>
  )
}

export default Statistics
