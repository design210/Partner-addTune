import styles from '@style/Main.module.scss'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { dashboardState } from '@modules/recoil/DashboardRecoil'
import dayjs from 'dayjs'
import MyContract from '@components/main/MyContract'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const Calculate = (): JSX.Element => {
  const { t, i18n } = useTranslation()
  const dashboardData = useRecoilValue(dashboardState)
  const data = dashboardData.data.settlementDeposit
  const navigate = useNavigate()
  const move = () => {
    navigate('/calculate')
  }
  return (
    <section className={styles.calculate}>
      <p className={styles.title}>{t('everyDay')}</p>
      <p className={styles.subject}>
        {((): JSX.Element | any => {
          if (i18n.language === 'ko') {
            return (
              <>
                <span>{t('money')}</span> {t('takeIt')}
              </>
            )
          } else {
            if (i18n.language === 'en') {
              return (
                <>
                  {t('takeIt')} <span>{t('money')}</span>
                </>
              )
            }
          }
        })()}
      </p>
      <p className={styles.comment}>{t('calDetailCheck')}</p>
      <div className={styles.coinDeco}>
        <img src={`${process.env.PUBLIC_URL}/assets/img/img_coin.png`} alt="" />
      </div>
      <section className={styles.calInfoWrap}>
        <article className={styles.calInfo}>
          <div className={styles.infoCal1}>
            <div className={data ? `${styles.subject}` : `${styles.subject} ${styles.noneData}`}>
              {t('SettlementHistory')}
              <span>
                {data ? (
                  <>
                    {data.year}
                    {t('year')} {data.month}.01~{data.month}.{dayjs(`${data.year}-${data.month}`).daysInMonth()}
                  </>
                ) : (
                  <>
                    {dayjs().format('YYYY.MM.DD')}~{dayjs().format('YYYY.MM')}
                    {dayjs().daysInMonth()}
                  </>
                )}
              </span>
            </div>
            <button type="button" className={styles.buttonOverlay} onClick={move}>
              <span>+</span> {t('detailView')}
            </button>
          </div>
          <div className={`${styles.infoCal2} ${styles.mt10}`}>
            {data ? (
              <>
                {data.year}
                {t('year')} {data.month}
                {t('months')} {t('actualPayment2')}
                <span className={styles.pl5}>
                  {data.price.toLocaleString()}
                  {t('won')}
                </span>{' '}
                {t('is')}
              </>
            ) : (
              <>
                <div className={`${styles.realPay} ${styles.mt25}`}>
                  {((): JSX.Element | any => {
                    if (i18n.language === 'ko') {
                      return <>{dayjs().format('YYYY년 MM월')}</>
                    } else {
                      if (i18n.language === 'en') {
                        return <>{dayjs().format('YYYY. MM')}</>
                      }
                    }
                  })()}{' '}
                  {t('noneActualPayment')}
                </div>
                <div className={`${styles.later} ${styles.mt5}`}>다음 정산에 만나요.</div>
              </>
            )}
          </div>
        </article>
        <MyContract />
      </section>
    </section>
  )
}

export default Calculate
