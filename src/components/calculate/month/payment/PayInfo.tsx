import React from 'react'
import styles from '@style/calculate/calculate.module.scss'
import { useRecoilValue } from 'recoil'
import { monthsDetailsState } from '@modules/recoil/Calculate'
import { useTranslation } from 'react-i18next'
import { getCookie } from '@utils/cookie'
import userType from '@utils/userType'
const PayInfo = (): JSX.Element => {
  const { t } = useTranslation()
  const { deposit, totals } = useRecoilValue(monthsDetailsState)
  const contractType = getCookie('contractType')
  const contractStatus: any = userType(contractType)
  return (
    <section className={`${styles.container} ${styles.mt60}`}>
      <div className={`${styles.flex} ${styles.between} ${styles.alignCenter}`}>
        <div>
          <span className={deposit.status === 'SYS22511B012' ? `${styles.tag} ${styles.warning}` : `${styles.tag} ${styles.success}`}>{deposit.statusName}</span>
          <p className={`${styles.real} ${styles.mt15}`}>
            {t('actualPayment')}&nbsp;
            <span>
              {deposit.paymentPrice.toLocaleString()}
              {t('won')}
            </span>
          </p>
          <span className={`${styles.pay} ${styles.mt15}`}>
            {t('afterPayment')}&nbsp;
            <span>
              {deposit.diffPrice.toLocaleString()}
              {t('won')}
            </span>
          </span>
          <ul className={`${styles.infoList} ${styles.mt40}`}>
            <li>
              <strong>{t('paymentInfo1')}</strong>
              {t('paymentInfo2')} <strong>{t('paymentInfo3')}</strong> {t('paymentInfo4')} <strong>{t('paymentInfo5')}</strong>
              {t('paymentInfo6')} <strong>{t('paymentInfo7')}</strong>
              {t('paymentInfo8')}
            </li>
            <li>{t('paymentInfo9')}</li>
            <li>{t('paymentInfo10')}</li>
            <li>{t('paymentInfo11')}</li>
          </ul>
        </div>
        <div className={styles.monthCalc}>
          <section className={styles.monthCalcCol1}>
            {contractStatus.storeStatus ? (
              <div className={`${styles.flex} ${styles.between}`}>
                <span className={styles.subject}>{t('storeSettlementAmount')}</span>
                <span className={`${styles.price} ${styles.add}`}>
                  + {totals.storeMonthTotal.toLocaleString()}
                  {t('won')}
                </span>
              </div>
            ) : (
              <></>
            )}
            {contractStatus.agentStatus ? (
              <div className={`${styles.flex} ${styles.between} ${styles.mt10}`}>
                <span className={styles.subject}>{t('storeAgentSettlementAmount')}</span>
                <span className={`${styles.price} ${styles.add}`}>
                  + {totals.storeAgentTotal.toLocaleString()}
                  {t('won')}
                </span>
              </div>
            ) : (
              <></>
            )}
            <div className={`${styles.flex} ${styles.between} ${styles.rent} ${styles.mt10}`}>
              <span className={styles.subject}>{t('rent')}</span>
              <span className={styles.price}>
                + {totals.rentFeeTotal.toLocaleString()}
                {t('won')}
              </span>
            </div>
            <section className={`${styles.monthCalcTotal} ${styles.mt10} ${styles.pt10}`}>
              <p>
                = {t('totalAmountSettlement')}&nbsp;
                <span>
                  {totals.total.toLocaleString()}
                  {t('won')}
                </span>
              </p>
            </section>
          </section>
          <section className={`${styles.monthCalcCol2}`}>
            <div className={`${styles.flex} ${styles.between}`}>
              <span className={styles.subject}>{t('cumulativeAmountCarriedForward')}</span>
              <span className={styles.price}>
                + {deposit.carryoverPrice.toLocaleString()}
                {t('won')}
              </span>
            </div>
            <div className={`${styles.flex} ${styles.between} ${styles.mt10}`}>
              <span className={styles.subject}>{t('totalTax')}</span>
              <span className={styles.price}>
                + {deposit.taxPrice.toLocaleString()}
                {t('won')}
              </span>
            </div>
            {deposit.companyPaymentKind === 'SYS22330B004' || deposit.companyPaymentKind === 'SYS22511B004' || deposit.companyPaymentKind === 'SYS22511B005' ? (
              <>
                <p className={`${styles.mt10}`}>
                  {t('localTax')} -{deposit.localTaxPrice.toLocaleString()}
                  {t('won')}
                </p>
                <p className={`${styles.mt5}`}>
                  {t('IncomeTax')} -{deposit.incomeTaxPrice.toLocaleString()}
                  {t('won')}
                </p>
              </>
            ) : (
              <></>
            )}
            {deposit.companyPaymentKind === 'SYS22330B003' ? (
              <p className={`${styles.mt10}`}>
                {t('vat')} +{deposit.taxPrice.toLocaleString()}원
              </p>
            ) : (
              <></>
            )}
            <section className={`${styles.monthCalcTotal} ${styles.mt10} ${styles.pt10}`}>
              <p>
                = {t('totalSettlementAmount')} {deposit.price.toLocaleString()}
                {t('won')}
              </p>
            </section>
          </section>
        </div>
      </div>
    </section>
  )
}

export default PayInfo
