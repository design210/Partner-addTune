import React, { useState, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useRecoilState, useSetRecoilState } from 'recoil'
import styles from '@style/board/Board.module.scss'
import '@style/common/common.module.scss'
import { contactListState, contactTab } from '@modules/recoil/BoardRecoil'
import { contactPage } from '@modules/recoil/Common'
import { getMyContact } from '@api/board'
import Pagination from '@components/form/Pagination'
import dayjs from 'dayjs'
import Button from '@components/common/Button'
import { responseType } from '../../types/common'
import { useTranslation } from 'react-i18next'
const ContactList = ({ viewDetail }: { viewDetail: any }): JSX.Element => {
  const { t } = useTranslation()
  const setContactSelect = useSetRecoilState(contactTab) //문의하기
  const [page, setPage] = useRecoilState(contactPage) // 페이지
  const [totalPage, setTotalPage] = useState<number>(0) // 전체 페이지
  const [contact, setContact] = useRecoilState(contactListState) //data
  const { refetch, data } = useQuery<responseType, Error>(['contactList', { size: 10, page }], async queryKey => await getMyContact(queryKey), {
    suspense: false,
    enabled: true,
    staleTime: 10 * 60 * 1000,
    onSuccess: data => {
      if (data.message === 'reFetch') {
        refetch()
      } else {
        setContact(data.data.content)
        setTotalPage(data.data.totalPages)
      }
    },
  })
  /*캐시세팅*/
  const queryClient = useQueryClient()
  const [queryData] = queryClient.getQueriesData(['contactList', { size: 10, page }])
  useEffect(() => {
    const [key, cache]: any = queryData
    cache && setContact(cache.data.content)
  }, [queryData])
  /*퍼이지 변경*/
  const paginationClick = (num: string) => {
    setPage(parseInt(num))
  }
  /*전체페이지 수*/
  useEffect(() => {
    if (data) {
      setTotalPage(data.data.totalPages)
    }
  }, [data])
  const newContact = () => {
    setContactSelect(true)
  }

  return (
    <section>
      <table className={`${styles.listTbl} ${styles.mt30}`}>
        <caption>{t('questionList')}</caption>
        <colgroup>
          <col width="120" />
          <col width="*" />
          <col width="120" />
          <col width="120" />
        </colgroup>
        <tbody>
          {contact.length > 0 &&
            contact.map((ele: any) => (
              <tr onClick={() => viewDetail(ele.sid)} key={ele.sid} className={styles.click}>
                <td className={styles.categories}>{ele.type}</td>
                <td className={styles.subject}>{ele.title}</td>
                <td className={styles.date}>{dayjs(ele.createdAt).format('YYYY.MM.DD')}</td>
                <td className={ele.status === 'SYS22707B009' ? `${styles.status} ${styles.ready}` : `${styles.status}`}>{ele.statusName}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {totalPage > 0 ? (
        <Pagination defaultPage={page} count={totalPage} paginationClick={paginationClick} />
      ) : (
        <section className={`${styles.noneList} ${styles.mt110}`}>
          <h2>{t('noneQuestion')}</h2>
          <p className={`${styles.mt15} ${styles.mb50}`}>{t('questionInfo')}</p>
          <div className={styles.buttonWrap}>
            <Button name={t('question')} onclick={newContact} className="btnConfirm" />
          </div>
        </section>
      )}
    </section>
  )
}

export default ContactList
