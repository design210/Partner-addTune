import React from 'react'
import styles from '@style/calculate/calculate.module.scss'
import BarChartHorizontal from '@components/chart/BarChartHorizontal'
import { useRecoilValue } from 'recoil'
import { usefulState } from '@modules/recoil/Calculate'
import { useTranslation } from 'react-i18next'

const Best5 = (): JSX.Element => {
  const { t } = useTranslation()
  const { topData } = useRecoilValue(usefulState)
  let indKey: any[]
  indKey = []
  let indValue: any[]
  indValue = []
  topData.business.forEach(ele => {
    indKey.push(ele.key)
    indValue.push(ele.value)
  })
  let zoneKey: any[]
  zoneKey = []
  let zoneValue: any[]
  zoneValue = []
  topData.zone.forEach(ele => {
    zoneKey.push(ele.key)
    zoneValue.push(ele.value)
  })
  return (
    <section className={`${styles.mt52} ${styles.adWrap}`}>
      <h2>{t('best5')}</h2>
      <div className={`${styles.flex} ${styles.between} ${styles.mt20}`}>
        <div className={styles.barChartHWrap}>
          <h4 className={`${styles.type}`}>{t('industry')}</h4>
          <BarChartHorizontal graphData={indValue} label={indKey} color="#FFDFE1" />
        </div>
        <div className={styles.barChartHWrap}>
          <h4 className={`${styles.area}`}>{t('zone')}</h4>
          <BarChartHorizontal graphData={zoneValue} label={zoneKey} color="#FFD874 " />
        </div>
      </div>
    </section>
  )
}

export default Best5
