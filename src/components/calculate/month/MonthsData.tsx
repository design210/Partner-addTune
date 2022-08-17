import React, { useState, useEffect } from 'react'
import Detail from '@components/calculate/month/payment/Detail'
import Specification from '@components/calculate/month/specification/Specification'
import Info from '@components/calculate/month/Information/Info'
import styles from '@style/calculate/calculate.module.scss'
import { monthsState } from '@modules/recoil/Calculate'
import { useRecoilValue } from 'recoil'
import { useTranslation } from 'react-i18next'
const MonthsData = ({ year, months }: { year: string; months: string }): JSX.Element => {
  const { t } = useTranslation()
  const [state, setState] = useState('detail') //detail, specification, info
  const currentMonth = useRecoilValue(monthsState)
  const setMenu = (status: string) => {
    setState(status)
  }
  useEffect(() => {
    setMenu('detail')
  }, [currentMonth])

  return (
    <>
      <ul className={`${styles.monthsTab} ${styles.flex} ${styles.justifyCenter} ${styles.mt50}`}>
        <li onClick={() => setMenu('detail')} className={state === 'detail' ? `${styles.active}` : ''}>
          {t('calcMenu1')}
        </li>
        <li onClick={() => setMenu('specification')} className={state === 'specification' ? `${styles.active}` : ''}>
          {t('calcMenu2')}
        </li>
        <li onClick={() => setMenu('info')} className={state === 'info' ? `${styles.active}` : ''}>
          {t('calcMenu3')}
        </li>
      </ul>
      {state === 'detail' ? <Detail year={year} months={months} /> : null}
      {state === 'specification' ? <Specification year={year} months={months} /> : null}
      {state === 'info' ? <Info year={year} months={months} /> : null}
    </>
  )
}

export default MonthsData
