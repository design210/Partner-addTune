import React, { useEffect, useState } from 'react'
import styles from '@style/calculate/calculate.module.scss'
import StoreInfo from '@components/calculate/month/Information/StoreInfo'
import AgentInfo from '@components/calculate/month/Information/AgentInfo'
import Best5 from '@components/calculate/month/Information/Best5'
import Statistics from '@components/calculate/month/Information/Statistics'
import { useQuery, useQueryClient } from 'react-query'
import { responseType } from '../../../../types/common'
import { getBeneficial } from '@api/calculate'
import { useSetRecoilState } from 'recoil'
import { usefulState } from '@modules/recoil/Calculate'
import Useful from '@skeletons/Useful'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { getCookie } from '@utils/cookie'
import userType from '@utils/userType'
const Info = ({ year, months }: { year: string; months: string }): JSX.Element => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const setData = useSetRecoilState(usefulState) // 데이터
  const [code, setCode] = useState(0)
  const { refetch, isLoading } = useQuery<responseType, Error>(['useful', year, months], async queryKey => await getBeneficial(queryKey), {
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
  const [queryData] = queryClient.getQueriesData(['useful', year, months])
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
              <section className={`${styles.infoWrap} ${styles.mt100}`}>
                <StoreInfo year={year} months={months} />
                <Statistics />
                <AgentInfo year={year} months={months} />
                <Best5 />
              </section>
            </>
          )
        } else if (code === 499 && !isLoading) {
          return (
            <section className={styles.noneYearData}>
              <h2>{t('errorTitle1')}</h2>
              <div className={`${styles.info} ${styles.mt10}`}>{t('errorComment1')}</div>
            </section>
          )
        } else if (code === 400) {
          navigate('/error')
        }
        return (
          <>
            <Useful />
          </>
        )
      })()}
    </>
  )
}

export default Info
