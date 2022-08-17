import React from 'react'
import styles from '@style/Main.module.scss'
import { useRecoilValue } from 'recoil'
import { dashboardState } from '@modules/recoil/DashboardRecoil'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const MyContract = (): JSX.Element => {
  const { t } = useTranslation()
  const dashboardData = useRecoilValue(dashboardState)
  const contract = dashboardData.data.contract
  const navigate = useNavigate()
  const move = () => {
    navigate('/myInfo/myContract')
  }
  return (
    <article className={styles.myContractWrap}>
      <div className={styles.myContract}>
        <h2>{t('menu1-2')}</h2>
        <div className={styles.ml25}>
          <p>
            {t('partnerRange')} : {contract.period}
          </p>
          <p>
            {t('companyCode')} : {contract.companySid}
          </p>
        </div>
        <div className={styles.ml40}>
          <p>
            {t('partnerType')} : {contract.kind}
          </p>
          <p>
            {t('companyName')} : {contract.companyName}
          </p>
        </div>
      </div>
      <button type="button" onClick={move}>
        + {t('detailView')}
      </button>
    </article>
  )
}

export default MyContract
