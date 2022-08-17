import React from 'react'
import styles from '@style/Main.module.scss'
import { useNavigate } from 'react-router-dom'
import { removeCookie } from '@utils/cookie'
import { useTranslation } from 'react-i18next'

const ErrorPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const move = () => {
    removeCookie('accessToken')
    removeCookie('refreshToken')
    navigate('/')
  }
  return (
    <section className={styles.errorPageWrap}>
      <div>
        <h1>
          {t('sorry')}
          <br />
          {t('serverError')}
        </h1>
        <div className={`${styles.reconnect} ${styles.mt10}`}> {t('connectLate')}</div>
        <div className={`${styles.goMain} ${styles.mt30}`}>
          <a onClick={move} style={{ cursor: 'pointer' }}>
            {t('moveLogin')}
          </a>
        </div>
        <div className={`${styles.customer} ${styles.mt30}`}>{t('errorInfo')} 1833-3055</div>
      </div>
    </section>
  )
}

export default ErrorPage
