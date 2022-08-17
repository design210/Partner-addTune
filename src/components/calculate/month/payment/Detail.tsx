import React, { useEffect, useState } from 'react'
import styles from '@style/calculate/calculate.module.scss'
import PayInfo from '@components/calculate/month/payment/PayInfo'
import StoreCalc from '@components/calculate/month/payment/StoreCalc'
import ExcavationAgent from '@components/calculate/month/payment/ExcavationAgent'
import InvestmentAgent from '@components/calculate/month/payment/InvestmentAgent'
import { useQuery, useQueryClient } from 'react-query'
import { responseType } from '../../../../types/common'
import { getCalculateMonthsDetail } from '@api/calculate'
import dayjs from 'dayjs'
import { useSetRecoilState } from 'recoil'
import { monthsDetailsState } from '@modules/recoil/Calculate'
import CalcMonths from '@skeletons/CalcMonths'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { getCookie } from '@utils/cookie'
import userType from '@utils/userType'
const Detail = ({ year, months }: { year: string; months: string }): JSX.Element => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const setData = useSetRecoilState(monthsDetailsState) // 데이터
  const [code, setCode] = useState(0)
  const { refetch, isLoading } = useQuery<responseType, Error>(['calMonthsDetail', year, months], async queryKey => await getCalculateMonthsDetail(queryKey), {
    suspense: false,
    enabled: true,
    staleTime: 60 * 60 * 1000,
    onSuccess: data => {
      if (data.message === 'reFetch') {
        refetch()
      } else {
        setCode(200)
        setData(data.data)
      }
    },
    onError: error => {
      const { code } = JSON.parse(error.message)
      setCode(code)
    },
  })
  /*캐시세팅*/
  const queryClient = useQueryClient()
  const [queryData] = queryClient.getQueriesData(['calMonthsDetail', year, months])
  useEffect(() => {
    const [key, cache]: any = queryData
    if (cache) {
      setData(cache.data)
      setCode(200)
    }
  }, [queryData])
  const contractType = getCookie('contractType')
  const contractStatus: any = userType(contractType)
  return (
    <>
      {(() => {
        if (code === 200 && !isLoading) {
          return (
            <>
              <h1 className={`${styles.monthsTitle} ${styles.mt50}`}>
                {year}
                {t('year')} {months}
                {t('months')} {t('details')}
              </h1>
              <p className={`${styles.range} ${styles.mt10}`}>
                {year}.{months}.01~{year}.{months}.{dayjs(`${year}-${months}`).daysInMonth()}
              </p>
              <PayInfo />
              {contractStatus.storeStatus ? <StoreCalc /> : <></>}
              {contractStatus.agentStatus ? (
                <>
                  <ExcavationAgent />
                  <InvestmentAgent />
                </>
              ) : (
                <></>
              )}
            </>
          )
        } else if (code === 499 && !isLoading) {
          return (
            <section className={styles.noneYearData}>
              <h2>{t('errorTitle2')}</h2>
              <div className={`${styles.info} ${styles.mt10}`}>{t('errorComment2')}</div>
            </section>
          )
        } else if (code === 400) {
          navigate('/error')
        }
        return (
          <>
            <CalcMonths />
          </>
        )
      })()}
    </>
  )
}

export default Detail
