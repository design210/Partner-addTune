import React, { useState, useEffect, useCallback } from 'react'
import Categories from '@components/notice/Categories'
import { useQuery, useQueryClient } from 'react-query'
import { useRecoilState } from 'recoil'
import styles from '@style/board/Board.module.scss'
import '@style/common/common.module.scss'
import { noticeListState } from '@modules/recoil/BoardRecoil'
import { getNotice } from '@api/board'
import Pagination from '@components/form/Pagination'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { responseType } from '../../types/common'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
const NoticeList = (): JSX.Element => {
  const { state }: { state: any } = useLocation()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [sid, setSid] = useState('') //카테고리
  const [page, setPage] = useState<number>(1) // 페이지
  const [totalPage, setTotalPage] = useState<number>(0) // 전체 페이지
  const [notice, setNotice] = useRecoilState(noticeListState) //data
  /*카테고리 선택값이 있을경우 카테고리 세팅*/
  useEffect(() => {
    state && setSid(state.id)
  }, [state])
  const { refetch, data } = useQuery<responseType, Error>(['noticeList', { size: 10, page, category: sid }], async queryKey => await getNotice(queryKey), {
    suspense: false,
    enabled: true,
    staleTime: 10 * 60 * 1000,
    onSuccess: data => {
      if (data.message === 'reFetch') {
        refetch()
      } else {
        setNotice(data.data.content)
        setTotalPage(data.data.totalPages)
      }
    },
  })
  /*캐시세팅*/
  const queryClient = useQueryClient()
  const [queryData] = queryClient.getQueriesData(['noticeList', { size: 10, page, category: sid }])
  useEffect(() => {
    const [key, cache]: any = queryData
    cache && setNotice(cache.data.content)
  }, [queryData])
  /*카테고리 변경*/
  const onclick = useCallback(
    (sid: string) => {
      setPage(1)
      setSid(sid)
    },
    [sid],
  )
  /*게시판 상세 보기*/
  const noticeDetail = (id: string) => {
    navigate(`/customerSupport/noticeDetail/${id}`, { state: { id: sid } })
  }
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
  return (
    <section>
      <h1 className={`${styles.title} ${styles.mb40}`}>{t('menu4-3')}</h1>
      <Categories onclick={onclick} id="SYS22705B011" setDefault={sid} />
      <table className={`${styles.listTbl} ${styles.mt30}`}>
        <caption>{t('menu4-3')}</caption>
        <colgroup>
          <col width="150" />
          <col width="*" />
          <col width="120" />
        </colgroup>
        <tbody>
          {notice.length > 0 &&
            notice.map((ele: any) => (
              <tr onClick={() => noticeDetail(ele.sid)} key={ele.sid} className={styles.click}>
                <td className={styles.categories}>{ele.categoryNames}</td>
                <td className={styles.subject}>{ele.title}</td>
                <td className={styles.date}>{dayjs(ele.createdAt).format('YYYY.MM.DD')}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {totalPage > 0 ? <Pagination defaultPage={page} count={totalPage} paginationClick={paginationClick} /> : <div className={`${styles.noDate} ${styles.mt50}`}>{t('noneList')}</div>}
    </section>
  )
}

export default NoticeList
