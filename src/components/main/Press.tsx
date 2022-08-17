import styles from '@style/Main.module.scss'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const Press = (): JSX.Element => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const moveList = () => {
    navigate('/letters')
  }
  return (
    <section className={styles.partnerWrap}>
      <h2>{t('menu3')}</h2>
      <h3 className={styles.mt8}>{t('story')}</h3>
      <p className={`${styles.comment} ${styles.mt5}`}>{t('pressService')}</p>
      <ul className={`${styles.pressWrap} ${styles.mt24}`}>
        <li>
          <div className={styles.thumbnail}>
            <img src={`${process.env.PUBLIC_URL}/assets/img/main_press_thumbnail_sample.png`} alt="" />
          </div>
          <div className={styles.subject}>인터브리드, 옥외광고 거래 플랫폼 ‘애드튠(ADDTUNE)’론칭</div>
        </li>
        <li>
          <div className={styles.thumbnail}>
            <img src={`${process.env.PUBLIC_URL}/assets/img/main_press_thumbnail_sample.png`} alt="" />
          </div>
          <div className={styles.subject}>인터브리드, 옥외광고 거래 플랫폼 ‘애드튠(ADDTUNE)’론칭</div>
        </li>
        <li>
          <div className={styles.thumbnail}>
            <img src={`${process.env.PUBLIC_URL}/assets/img/main_press_thumbnail_sample.png`} alt="" />
          </div>
          <div className={styles.subject}>인터브리드, 옥외광고 거래 플랫폼 ‘애드튠(ADDTUNE)’론칭</div>
        </li>
      </ul>
      <button className={styles.btnMore} onClick={moveList}>
        <i>
          <img src={`${process.env.PUBLIC_URL}/assets/img/plus.svg`} alt="" />
        </i>
        {t('more')}
      </button>
    </section>
  )
}

export default Press
