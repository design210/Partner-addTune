import React from 'react'
import styles from '@style/common/top.module.scss'
import TopLeftBanner from './TopLeftBanner'
import TopFixMenu from './TopFixMenu'
import TopUi from './TopUi'
import { Link } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { NavActive } from '@modules/recoil/NavRecoil'
const Top = (): JSX.Element => {
  const setActive = useSetRecoilState(NavActive)
  return (
    <>
      <header>
        <section className={styles.topWrapper}>
          <div className={styles.directLink}>
            <TopLeftBanner />
          </div>
          <div className={styles.bi} onClick={() => setActive(false)}>
            <Link to="/main">
              <img src={`${process.env.PUBLIC_URL}/assets/img/bi.svg`} alt="addtune" />
            </Link>
          </div>
          <TopFixMenu />
        </section>
      </header>
      <TopUi />
    </>
  )
}

export default Top
