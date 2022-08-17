import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { getCalculateAll } from '@api/calculate'
import { responseType } from '../../../types/common'
import { useRecoilState } from 'recoil'
import { calculateAllState } from '@modules/recoil/Calculate'
import styles from '@style/calculate/calculate.module.scss'
import LineChart from '@components/chart/LineChart'
import CalcTable from '@components/calculate/year/CalcTable'
import { useTranslation } from 'react-i18next'
const YearData = ({ year }: { year: string }): JSX.Element => {
  const { t } = useTranslation()
  const [chartData, setChartData] = useState<any>([])
  const [allData, setallData] = useRecoilState(calculateAllState)
  const { refetch } = useQuery<responseType, Error>(['calculateAll', year], async year => await getCalculateAll(year), {
    suspense: true,
    enabled: true,
    staleTime: 60 * 60 * 1000,
    onSuccess: data => {
      data.message === 'reFetch' ? refetch() : setallData(data.data)
    },
  })
  /*캐시세팅*/
  const queryClient = useQueryClient()
  const [queryData] = queryClient.getQueriesData(['calculateAll', year])
  useEffect(() => {
    const [key, cache]: any = queryData
    cache && setallData(cache.data)
  }, [queryData])
  useEffect(() => {
    if (allData && allData.deposits.length > 0) {
      const chartData = [null, null, null, null, null, null, null, null, null, null, null, null]
      allData.deposits.forEach(ele => {
        // @ts-ignore
        chartData[ele.month - 1] = ele.price
      })
      setChartData(chartData)
    }
  }, [allData])
  return (
    <>
      {allData ? (
        allData.total === 0 ? (
          <section className={styles.noneYearData}>
            <h2>{t('errorTitle4')}</h2>
            <div className={`${styles.info} ${styles.mt10}`}>{t('errorComment4')}</div>
          </section>
        ) : (
          <section className={styles.calculateAllWrap}>
            <h1 className={`${styles.mt75} ${styles.mb50}`}>
              {year}
              {t('year')} {t('totalSettlementAmount')} <span>{allData.total.toLocaleString()}</span>
              {t('won')}
            </h1>
            {chartData.length > 0 ? (
              <div className={styles.chartWrap}>
                <LineChart chartData={chartData} />
              </div>
            ) : (
              <></>
            )}
            <CalcTable list={allData.deposits} />
          </section>
        )
      ) : (
        <></>
      )}
    </>
  )
}

export default YearData
