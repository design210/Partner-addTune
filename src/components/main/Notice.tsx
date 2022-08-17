import styles from '@style/Main.module.scss'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { dashboardState } from '@modules/recoil/DashboardRecoil'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const Notice = (): JSX.Element => {
  const { t } = useTranslation()
  const dashboardData = useRecoilValue(dashboardState)
  const list = dashboardData.data.notice
  const navigate = useNavigate()
  const moveList = () => {
    navigate('/customerSupport/notice')
  }
  const move = (id: number) => {
    navigate(`/customerSupport/noticeDetail/${id}`)
  }
  return (
    <section className={styles.noticeWrap}>
      <h2>{t('menu4-3')}</h2>
      <h3 className={styles.mt16}>{t('moneyInfo')}</h3>
      <div className={`${styles.comment} ${styles.mt5}`}>{t('majorNotice')}</div>
      <ul className={`${styles.list} ${styles.mt24}`}>
        {list.map(ele => (
          <li key={ele.sid} onClick={() => move(ele.sid)}>
            {ele.title}
          </li>
        ))}
      </ul>
      <button className={`${styles.btnMore} ${styles.mt13}`} onClick={moveList}>
        <i>
          <img src={`${process.env.PUBLIC_URL}/assets/img/plus.svg`} alt="" />
        </i>
        {t('more')}
      </button>
    </section>
  )
}

export default Notice
