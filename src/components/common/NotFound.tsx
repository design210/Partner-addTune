import React from 'react'
import Top from '@components/common/top/Top'
import Footer from '@components/common/Footer'
import styles from '@style/Main.module.scss'
import { Link } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { NavActive } from '@modules/recoil/NavRecoil'
import { useTranslation } from 'react-i18next'
const NotFound = () => {
  const { t } = useTranslation()
  const setActive = useSetRecoilState(NavActive)
  return (
    <>
      <Top />
      <section className={styles.errorPageWrap}>
        <div>
          <h1>
            {t('sorry')}
            <br />
            {t('notFound')}
          </h1>
          <div className={`${styles.goMain} ${styles.mt30}`}>
            <Link to="/main" onClick={() => setActive(false)}>
              {t('moveMain')}
            </Link>
          </div>
          <div className={`${styles.customer} ${styles.mt30}`}>{t('customerCenter')} 1833-3055</div>
          <div className={`${styles.info} ${styles.mt10}`}>{t('errorInfo')}</div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default NotFound
