import React, { useRef } from 'react'
import styles from '@style/calculate/calculate.module.scss'
import { useRecoilValue } from 'recoil'
import { monthsDetailsState, monthsState } from '@modules/recoil/Calculate'
import { useTranslation } from 'react-i18next'
const InvestmentAgent = (): JSX.Element => {
  const { t } = useTranslation()
  const { storeAgent2022MonthSettlement } = useRecoilValue(monthsDetailsState)
  const months = useRecoilValue(monthsState)
  const tblWrapper = useRef<any>(null)
  const toggle = (index: number) => {
    const num = index + 3
    if (tblWrapper.current.childNodes[num].childNodes[0].classList.contains(`${styles.active}`)) {
      tblWrapper.current.childNodes[num].childNodes[0].classList.remove(`${styles.active}`)
      tblWrapper.current.childNodes[num].childNodes[1].classList.remove(`${styles.active}`)
    } else {
      tblWrapper.current.childNodes[num].childNodes[0].classList.add(`${styles.active}`)
      tblWrapper.current.childNodes[num].childNodes[1].classList.add(`${styles.active}`)
    }
  }
  return (
    <>
      {storeAgent2022MonthSettlement.list.length > 0 ? (
        <section className={`${styles.containerTbl} ${styles.mt60}`}>
          <h2>{t('storeInvest')}</h2>
          <h3 className={styles.mt10}>
            {months}
            {t('monthCalcAmount')}&nbsp;
            <span>
              {storeAgent2022MonthSettlement.total.toLocaleString()}
              {t('won')}
            </span>
          </h3>
          <table className={`${styles.calcDetailTbl} ${styles.mt30}`} ref={tblWrapper}>
            <caption>{t('storeCalc')}</caption>
            <colgroup>
              <col width="*" />
              <col width="200" />
              <col width="150" />
              <col width="150" />
              <col width="150" />
              <col width="100" />
            </colgroup>
            <thead>
              <tr>
                <th className={`${styles.left} ${styles.pl10}`}>{t('storeName')}</th>
                <th>{t('excavationType')}</th>
                <th>{t('monthlyAdvertisingRevenue')}</th>
                <th>{t('excavationFee')}</th>
                <th>{t('settlementAmount')}</th>
                <th></th>
              </tr>
            </thead>
            {storeAgent2022MonthSettlement.list.map((ele, index) => (
              <tbody key={index}>
                <tr>
                  <td className={`${styles.left} ${styles.pl10}`}>{ele.companyStoreName}</td>
                  <td>{ele.kind}</td>
                  <td className={`${styles.right} ${styles.pr10}`}>{ele.salePrice.toLocaleString()}</td>
                  <td className={`${styles.right} ${styles.pr10}`}>{ele.fee.toLocaleString()}</td>
                  <td className={`${styles.right} ${styles.pr10}`}>{ele.price.toLocaleString()}</td>
                  <td>{ele.storeSaleList.length > 0 ? <span className={styles.icon} onClick={() => toggle(index)} /> : null}</td>
                </tr>
                <tr className={styles.detailView}>
                  <td colSpan={5} className={styles.calcDetail}>
                    <table className={styles.calcDetailTbl}>
                      <caption>{t('storeCalcDetail')}</caption>
                      <colgroup>
                        <col width="80" />
                        <col width="*" />
                        <col width="200" />
                        <col width="150" />
                        <col width="150" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th className={`${styles.left} ${styles.pl10}`}>{t('campaignName')}</th>
                          <th>{t('executionPeriod')}</th>
                          <th>{t('advertisingCost')}</th>
                          <th>
                            {t('settlementAmount')}
                            <span>({t('commission')} 10%)</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ele.storeSaleList.map((elm, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td className={`${styles.left} ${styles.pl10}`}>{elm.title}</td>
                            <td>{elm.period}</td>
                            <td className={`${styles.right} ${styles.pr10}`}>{elm.buyPrice.toLocaleString()}</td>
                            <td className={`${styles.right} ${styles.pr10}`}>{elm.price.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </section>
      ) : (
        <></>
      )}
    </>
  )
}

export default InvestmentAgent
