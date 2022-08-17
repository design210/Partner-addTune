import React from 'react'
import styles from '@style/common/footer.module.scss'
import Terms from '@components/common/Terms'
import { useSetRecoilState } from 'recoil'
import { ModalState } from '@modules/recoil/ModalRecoil'
import { useTranslation } from 'react-i18next'
const Footer = (): JSX.Element => {
  const { t } = useTranslation()
  const setModalState = useSetRecoilState(ModalState)
  const openPrivate = (): void => {
    setModalState({
      status: true,
      title: t('private'),
      width: 620,
      closeBtn: true,
      confirm: false,
      element: <Terms status="private" />,
    })
  }
  const openService = (): void => {
    setModalState({
      status: true,
      title: t('service'),
      width: 620,
      closeBtn: true,
      confirm: false,
      element: <Terms status="service" />,
    })
  }
  return (
    <footer>
      <div className={styles.wrapper}>
        <p>
          <img src={`${process.env.PUBLIC_URL}/assets/img/footer_bi.svg`} alt="partner" />
        </p>
        <p className={`${styles.info} ${styles.margin}`}>
          <span>{t('customerCenter')}</span> (+82) 1833-3055 | {t('normalDay')} 10:00 ~ 18:00
        </p>
        <p className={styles.info}>{t('companyInfo')}</p>
        {/*<p className={`${styles.info} ${styles.mb2} ${styles.link}`}>*/}
        {/*  <span onClick={openPrivate}>{t('private')}</span> | <span onClick={openService}>{t('service')}</span>*/}
        {/*</p>*/}
        <p className={styles.info}>{t('security')}</p>
        <p className={styles.copyright}>Copyright © 2020. Interbrid.All rights reserved. </p>
        <ul className={styles.snsWrap}>
          <li>
            <a href="https://www.youtube.com/c/TUNEUNIVERSE" target="_blank" rel="noreferrer">
              <img src={`${process.env.PUBLIC_URL}/assets/img/youtube.svg`} alt="youtube" />
            </a>
          </li>
          <li>
            <a href="https://blog.naver.com/interbrid_tune" target="_blank" rel="noreferrer">
              <img src={`${process.env.PUBLIC_URL}/assets/img/blog.svg`} alt="naverblog" />
            </a>
          </li>
          <li>
            <a href="https://pf.kakao.com/_xbjnab" target="_blank" rel="noreferrer">
              <img src={`${process.env.PUBLIC_URL}/assets/img/kakao.svg`} alt="kakaotalk" />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/tuneuniverse" target="_blank" rel="noreferrer">
              <img src={`${process.env.PUBLIC_URL}/assets/img/facebook.svg`} alt="facebook" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/accounts/login/?next=/add_tune/" target="_blank" rel="noreferrer">
              <img src={`${process.env.PUBLIC_URL}/assets/img/instagram.svg`} alt="instagram" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default React.memo(Footer)
