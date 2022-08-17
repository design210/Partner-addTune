import styles from '@style/Main.module.scss'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { dashboardState } from '@modules/recoil/DashboardRecoil'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const PrivateInfo = (): JSX.Element => {
  const { t } = useTranslation()
  const dashboardData = useRecoilValue(dashboardState)
  const me = dashboardData.data.me
  return (
    <section className={styles.privateInfo}>
      <h2>{t('yesterday')}</h2>
      <button className={styles.btnModify}>
        <Link to="/myInfo/profile?status=modify">
          <img src={`${process.env.PUBLIC_URL}/assets/img/icon_setting.svg`} alt="" />
        </Link>
        <span>{t('modify')}</span>
      </button>
      <p className={`${styles.update} ${styles.mt5}`}>{t('infoChange')}</p>
      <article className={styles.infoDetail}>
        <table className={styles.mt14}>
          <colgroup>
            <col width="126" />
            <col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th>{t('companyName')}</th>
              <td>{me.companyName}</td>
            </tr>
            <tr>
              <th>{t('businessNum')}</th>
              <td>{me.companyCrNum}</td>
            </tr>
            <tr>
              <th>{t('bnNum')}</th>
              <td>{me.companyBtNum}</td>
            </tr>
            <tr>
              <th>{t('ceo')}</th>
              <td>{me.companyCeo}</td>
            </tr>
            <tr>
              <th className={styles.top}>{t('address')}</th>
              <td>
                <span className={styles.address}>
                  {me.companyAddress1} {me.companyAddress2}
                </span>
              </td>
            </tr>
            <tr>
              <th>{t('tel')}</th>
              <td>{me.companyPersonTel}</td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  )
}

export default PrivateInfo
