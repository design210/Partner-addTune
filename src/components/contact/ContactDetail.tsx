import React, { useEffect, useState } from 'react'
import Button from '@components/common/Button'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { contactDetailState, contactTab } from '@modules/recoil/BoardRecoil'
import { useQuery, useQueryClient } from 'react-query'
import { getMyContactDetail } from '@api/board'
import { responseType } from '../../types/common'
import styles from '@style/board/Board.module.scss'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

const ContactDetail = ({ viewList, id }: { viewList: () => void; id: string }): JSX.Element => {
  const { t } = useTranslation()
  const [contactData, setContactData] = useRecoilState(contactDetailState)
  const setContactSelect = useSetRecoilState(contactTab) //문의하기
  const [answerFlag, setAnswerFlag] = useState(false)
  const newContact = () => {
    setContactSelect(true)
  }
  const { refetch } = useQuery<responseType, Error>(['noticeListDetail', id], async id => await getMyContactDetail(id), {
    suspense: false,
    enabled: true,
    staleTime: 10 * 60 * 1000,
    onSuccess: data => {
      data.message === 'reFetch' ? refetch() : setContactData(data.data)
    },
  })
  /*캐시세팅*/
  const queryClient = useQueryClient()
  const [queryData] = queryClient.getQueriesData(['noticeListDetail', id])
  useEffect(() => {
    const [key, cache]: any = queryData
    cache && setContactData(cache.data)
  }, [queryData])
  useEffect(() => {
    if (contactData) {
      const question = contactData.content
      let questionElement = document.querySelector('.question')
      if (question !== null && question !== '') {
        questionElement!.innerHTML = question
      }
      const answer = contactData.answer
      let answerElement = document.querySelector('.answer')
      if (answerFlag) {
        if (typeof answer === 'string') {
          answerElement!.innerHTML = answer
        }
      }
    }
  }, [contactData, answerFlag])
  useEffect(() => {
    if (contactData.answer !== null && contactData.answer !== '') {
      setAnswerFlag(true)
    }
    return () => {
      setAnswerFlag(false)
    }
  }, [contactData.answer])

  return (
    <>
      <table className={`${styles.readTbl} ${styles.mt50} ${styles.contactTbl}`}>
        <colgroup>
          <col width="150" />
          <col width="*" />
          <col width="120" />
          <col width="80" />
        </colgroup>
        <tbody>
          <tr>
            <td className={styles.category}>{contactData.type}</td>
            <td className={styles.title}>{contactData.title}</td>
            <td className={styles.date}>{dayjs(contactData.date).format('YYYY.MM.DD')}</td>
            <td className={contactData.status === 'SYS22707B009' ? `${styles.ready} ${styles.status}` : `${styles.status}`}>{contactData.statusName}</td>
          </tr>
          <tr>
            <td colSpan={4} className={`${styles.pt30} ${styles.pb30}`}>
              <div className={`${styles.hour} ${styles.pl40}`}>{dayjs(contactData.date).format('YYYY.MM.DD HH:mm')}</div>
              <div className={`question ${styles.tblContent} ${styles.mt10}`} />
            </td>
          </tr>
          {answerFlag ? (
            <tr>
              <td colSpan={4} className={`${styles.pt30} ${styles.pb30}`}>
                <div className={styles.relative}>
                  <div className={styles.replyImg}>
                    <img src={`${process.env.PUBLIC_URL}/assets/img/reply.svg`} alt="" />
                  </div>
                  <div className={styles.ml74}>
                    <span className={styles.replyComplete}>{t('answerComplete')}</span>
                    <span className={`${styles.hour} ${styles.ml10}`}>{dayjs(contactData.answerDate).format('YYYY.MM.DD HH:mm')}</span>
                  </div>
                  <div className={`answer ${styles.tblContent} ${styles.mt10} ${styles.ml34}`} />
                </div>
              </td>
            </tr>
          ) : (
            <></>
          )}
        </tbody>
      </table>
      <div className={`${styles.right} ${styles.mt20}`}>
        <span className={styles.mr8}>
          <Button name={t('newQuestion')} onclick={newContact} className="btnblueBg" />
        </span>
        <span>
          <Button name={t('list')} onclick={viewList} className="btnGray" />
        </span>
      </div>
    </>
  )
}

export default ContactDetail
