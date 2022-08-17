import styles from '@style/common/top.module.scss'
import React, { useEffect } from 'react'
import { logOut } from '@api/login'
import { useQuery, useQueryClient } from 'react-query'
import { removeCookie } from '@utils/cookie'
import { useNavigate } from 'react-router-dom'
import { responseType } from '../../../types/common'
import { useTranslation } from 'react-i18next'
const TopFixMenu: React.FC = (): JSX.Element => {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const changelanguageToKo = () => i18n.changeLanguage('ko')
  const changelanguageToEn = () => i18n.changeLanguage('en')
  const { data, error, refetch } = useQuery<responseType, Error>('logOut', logOut, {
    staleTime: 0,
    cacheTime: 0,
    enabled: false,
    onSuccess: () => queryClient.invalidateQueries(),
  })
  const navigate = useNavigate()
  useEffect(() => {
    if (error) {
      const { message } = JSON.parse(error.message)
      console.log(`Error : ${message}`)
    } else {
      if (data) {
        removeCookie('accessToken')
        removeCookie('refreshToken')
        navigate('/')
      }
    }
  }, [data, error])
  return (
    <>
      <section className={styles.language}>
        {/*<span onClick={changelanguageToKo}>한국어</span>*/}
        {/*<span onClick={changelanguageToEn}>영어</span>*/}
      </section>
      <button className={styles.topFixMenu} onClick={() => refetch()}>
        {t('logout')}
      </button>
    </>
  )
}

export default React.memo(TopFixMenu)
