import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import styles from '@style/calculate/calculate.module.scss'
import { useRecoilState, useRecoilValue } from 'recoil'
import { monthsState, yearState } from '@modules/recoil/Calculate'
import SelectYear from '@components/form/SelectYear'
import { useTranslation } from 'react-i18next'
const Calendar = (): JSX.Element => {
  const { t } = useTranslation()
  const selectedYear = useRecoilValue(yearState)
  const [months, setMonths] = useRecoilState(monthsState)
  const currentYear: number = parseInt(dayjs().format('YYYY'))
  const currentMonth: number = parseInt(dayjs().format('M')) - 1
  const monthArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  useEffect(() => {
    setMonths('all')
  }, [selectedYear])

  return (
    <section className={`${styles.calendarWrap} ${styles.flex} ${styles.alignCenter}`}>
      <div className={styles.year}>
        <SelectYear />
      </div>
      <ul className={`${styles.months} ${styles.flex} ${styles.between} ${styles.alignCenter}`}>
        <li className={months === 'all' ? `${styles.active}` : ''} onClick={() => setMonths('all')}>
          {t('all')}
        </li>
        {parseInt(selectedYear) === currentYear
          ? monthArr.map((ele: string, index: number) =>
              index <= currentMonth ? (
                <li key={index} onClick={() => setMonths(ele)} className={parseInt(months) - 1 === index ? `${styles.active}` : ''}>
                  {`${ele}${t('months')}`}
                </li>
              ) : (
                <li key={index} className={styles.disabled}>
                  {ele}
                </li>
              ),
            )
          : monthArr.map((ele: string, index: number) => (
              <li key={index} onClick={() => setMonths(ele)} className={parseInt(months) - 1 === index ? `${styles.active}` : ''}>
                {`${ele}${t('months')}`}
              </li>
            ))}
      </ul>
    </section>
  )
}

export default Calendar
