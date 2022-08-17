import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { responseType } from '../../../../types/common'
import { getStatement } from '@api/calculate'
import styles from '@style/calculate/calculate.module.scss'
import Specificate from '@skeletons/Specificate'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
const Specification = ({ year, months }: { year: string; months: string }): JSX.Element => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [code, setCode] = useState(0)
  const [html, setHtml] = useState('')
  const { isLoading, data } = useQuery<responseType, Error>(['calStatement', year, months], async queryKey => await getStatement(queryKey), {
    suspense: false,
    enabled: true,
    staleTime: 60 * 60 * 1000,
    onSuccess: data => {},
    onError: error => {
      const { code } = JSON.parse(error.message)
      setCode(code)
    },
  })
  useEffect(() => {
    if (data) {
      data!.code === 200 && setCode(200)
      setHtml(data.data)
    }
  }, [data])
  /*캐시세팅*/
  const queryClient = useQueryClient()
  const [queryData] = queryClient.getQueriesData(['calStatement', year, months])
  useEffect(() => {
    const [key, cache]: any = queryData
    if (cache) {
      setHtml(cache.data)
      setCode(200)
    }
  }, [queryData])
  return (
    <>
      {(() => {
        if (code === 200 && !isLoading) {
          return <section dangerouslySetInnerHTML={{ __html: html }} className={styles.mt80}></section>
        } else if (code === 499 && !isLoading) {
          return (
            <section className={styles.noneYearData}>
              <h2>{t('errorTitle3')}</h2>
              {/*<div className={`${styles.info} ${styles.mt10}`}>{t('errorComment3')}</div>*/}
            </section>
          )
        } else if (code === 400) {
          navigate('/error')
        }
        return (
          <>
            <Specificate />
          </>
        )
      })()}
    </>
  )
}

export default Specification
