import React from 'react'
import styles from '@style/calculate/calculate.module.scss'
import { deposits } from '../../../types/calculate'
import { useTranslation } from 'react-i18next'
const CalcTable = ({ list }: { list: Array<deposits> }): JSX.Element => {
  const { t } = useTranslation()
  return (
    <>
      <table className={`${styles.calculateTbl} ${styles.mt70}`}>
        <caption>{t('yearSettlementAmount')}</caption>
        <thead>
          <tr>
            <th>{t('settlementMonth')}</th>
            <th>{t('cumulativeAmountCarriedForward')}</th>
            <th>{t('settlementAmount')}</th>
            <th>{t('totalTax')}</th>
            <th>{t('actualPayment')}</th>
            <th>{t('differenceAfterPayment')}</th>
            <th>{t('processingStatus')}</th>
          </tr>
        </thead>
        <tbody>
          {list.map(ele => (
            <tr key={ele.sid}>
              <td>
                {ele.month}
                {t('months')}
              </td>
              <td>{ele.carryoverPrice.toLocaleString()}</td>
              <td>{ele.price.toLocaleString()}</td>
              <td>{ele.taxPrice.toLocaleString()}</td>
              <td>{ele.paymentPrice.toLocaleString()}</td>
              <td>{ele.diffPrice.toLocaleString()}</td>
              <td className={ele.status === 'SYS22511B012' ? `${styles.impossible}` : ''}>{ele.statusName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default CalcTable
