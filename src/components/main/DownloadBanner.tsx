import styles from '@style/Main.module.scss'
import React from 'react'
const DownloadBanner = (): JSX.Element => {
  return (
    <div className={`${styles.appBanner} ${styles.mt50} ${styles.mr100}`}>
      <a href="https://play.google.com/store/search?q=addtune&c=apps" target="_blank" rel="noreferrer">
        <img src={`${process.env.PUBLIC_URL}/assets/img/app_download_banner.svg`} alt="우리 동네부터 전국 광고까지! 너무 쉬운 옥외광고 애드튠 다운로드 " />
      </a>
    </div>
  )
}

export default DownloadBanner
