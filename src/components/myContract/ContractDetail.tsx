import React, { useCallback } from 'react'
import styles from '@style/myInfo/myInfo.module.scss'
import { useQuery } from 'react-query'
import { getMyContract } from '@api/myInfo'
import { responseType } from '../../types/common'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { myContractState } from '@modules/recoil/MyProfile'
import { ModalState } from '@modules/recoil/ModalRecoil'
import Contract from '@components/modal/Contract'
import { useTranslation } from 'react-i18next'
const ContractDetail = (): JSX.Element => {
  const { t } = useTranslation()
  const [contract, setContract] = useRecoilState(myContractState) //계약서 데이터
  const setModalState = useSetRecoilState(ModalState)
  const { refetch } = useQuery<responseType, Error>('myContract', async () => await getMyContract(), {
    suspense: false,
    enabled: true,
    onSuccess: data => {
      data.message === 'reFetch' ? refetch() : setContract(data.data)
    },
  })
  /*계약서 보기*/
  const contractView = useCallback((id: string) => {
    setModalState({
      status: true,
      title: t('contractView'),
      width: 800,
      closeBtn: true,
      confirm: true,
      element: <Contract id={id} />,
    })
  }, [])
  return (
    <section className={styles.contractWrap}>
      <h1>
        {contract.companyName} {t('contract')}
      </h1>
      <table className={`${styles.mt40} ${styles.infoTbl}`}>
        <caption>{t('contract')}</caption>
        <colgroup>
          <col width="140" />
          <col width="*" />
          <col width="140" />
          <col width="*" />
        </colgroup>
        <thead>
          <tr>
            <th>{t('partnerRange')}</th>
            <td>{contract.period}</td>
            <th>{t('partnerType')}</th>
            <td>{contract.kind}</td>
          </tr>
          <tr>
            <th>{t('companyName')}</th>
            <td>{contract.companyName}</td>
            <th>{t('companyCode')}</th>
            <td>{contract.companySid}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={4} className={styles.contractList}>
              <ul>
                {contract.files.length > 0
                  ? contract.files.map(ele => (
                      <li key={ele.sid} onClick={() => contractView(ele.sid)}>
                        <span>{ele.name}</span>
                      </li>
                    ))
                  : null}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export default ContractDetail
