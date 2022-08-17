import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from '@style/board/Board.module.scss'
import { useQuery, useQueryClient } from 'react-query'
import { getNoticeDetail } from '@api/board'
import { useRecoilState } from 'recoil'
import { noticeDetailState } from '@modules/recoil/BoardRecoil'
import dayjs from 'dayjs'
import Button from '@components/common/Button'
import { responseType } from '../../types/common'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
const NoticeDetailBody = (): JSX.Element => {
  const { t } = useTranslation()
  const { state }: { state: any } = useLocation()
  const navigate = useNavigate()
  const { id } = useParams()
  const [detailData, setDetailData] = useRecoilState(noticeDetailState) //data
  const { refetch } = useQuery<responseType, Error>(['noticeListDetail', id], async id => await getNoticeDetail(id), {
    suspense: false,
    enabled: true,
    staleTime: 10 * 60 * 1000,
    onSuccess: data => {
      data.message === 'reFetch' ? refetch() : setDetailData(data.data)
    },
  })
  /*캐시세팅*/
  const queryClient = useQueryClient()
  const [queryData] = queryClient.getQueriesData(['noticeListDetail', id])
  useEffect(() => {
    const [key, cache]: any = queryData
    cache && setDetailData(cache.data)
  }, [queryData])

  const route = () => {
    state ? navigate('/customerSupport/notice', { state: { id: state.id } }) : navigate('/customerSupport/notice')
  }
  useEffect(() => {
    if (detailData) {
      const html = detailData.content
      let body = document.querySelector('.noticeBody')
      body!.innerHTML = html
    }
  }, [detailData])
  return (
    <section>
      <h1 className={`${styles.title} ${styles.mb40}`}>{t('menu4-3')}</h1>
      <table className={`${styles.readTbl} ${styles.mt50}`}>
        <colgroup>
          <col width="150" />
          <col width="*" />
          <col width="120" />
        </colgroup>
        <tbody>
          <tr>
            <td className={styles.category}>{detailData.categoryNames}</td>
            <td className={styles.title}>{detailData.title}</td>
            <td className={styles.date}>{dayjs(detailData.createdAt).format('YYYY.MM.DD')}</td>
          </tr>
          <tr>
            <td colSpan={3}>
              <div className={`noticeBody ${styles.tblContent}`} />
            </td>
          </tr>
        </tbody>
      </table>
      <div className={`${styles.mt20} ${styles.btnList} ${styles.right}`}>
        <Button name={t('list')} onclick={route} className="btnGray" />
      </div>
    </section>
  )
}

export default NoticeDetailBody
