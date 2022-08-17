import React, { useCallback, useEffect, useState } from 'react'
import styles from '@style/board/Board.module.scss'
import Categories from '@components/notice/Categories'
import { useRecoilState } from 'recoil'
import { faqListState } from '@modules/recoil/BoardRecoil'
import { useQuery, useQueryClient } from 'react-query'
import { getFaq } from '@api/board'
import Pagination from '@components/form/Pagination'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import { styled } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { responseType } from '../../types/common'
import { useTranslation } from 'react-i18next'
const FaqList = (): JSX.Element => {
  const { t } = useTranslation()
  const [sid, setSid] = useState('') //카테고리
  const [page, setPage] = useState<number>(1) // 페이지
  const [totalPage, setTotalPage] = useState<number>(0) // 전체 페이지
  const [faq, setFaq] = useRecoilState(faqListState) //data
  const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
    border: `1px solid #E9EBED`,
    borderRadius: 10,
    marginBottom: 10,
    '&:not(:last-child)': {
      //borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }))
  const AccordionSummary = styled((props: AccordionSummaryProps) => <MuiAccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: '2em' }} />} {...props} />)(({ theme }) => ({
    //backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
    //flexDirection: 'row-reverse',
    paddingTop: 6,
    paddingBottom: 6,
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: 26,
    },
  }))
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    paddingLeft: 43,
    borderTop: '1px solid #E9EBED',
    backgroundColor: '#F7F8F9',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingTop: 26,
    paddingBottom: 26,
  }))
  const { refetch } = useQuery<responseType, Error>(['faqList', { size: 10, page, category: sid }], async queryKey => await getFaq(queryKey), {
    suspense: false,
    enabled: true,
    staleTime: 10 * 60 * 1000,
    onSuccess: data => {
      if (data.message === 'reFetch') {
        refetch()
      } else {
        setFaq(data.data.content)
        setTotalPage(data.data.totalPages)
      }
    },
  })
  /*캐시세팅*/
  const queryClient = useQueryClient()
  const [queryData] = queryClient.getQueriesData(['faqList', { size: 10, page, category: sid }])
  useEffect(() => {
    const [key, cache]: any = queryData
    cache && setFaq(cache.data.content)
  }, [queryData])
  /*카테고리 변경*/
  const onclick = useCallback(
    (sid: string) => {
      setPage(1)
      setSid(sid)
    },
    [sid],
  )
  /*퍼이지 변경*/
  const paginationClick = (num: string) => {
    setPage(parseInt(num))
  }
  return (
    <section>
      <h1 className={`${styles.title} ${styles.mb40}`}>{t('menu4-1')}</h1>
      <Categories onclick={onclick} id="SYS22705B010" />
      <div className={styles.mt40}>
        {faq.length > 0 ? (
          faq.map((ele: any) => (
            <Accordion key={ele.sid} className={`${styles.accordion}`}>
              <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                <div className={`${styles.flex} ${styles.alignCenter}`}>
                  <span className={styles.q}>Q</span>
                  <span className={styles.content}>
                    <span className={styles.tag}>[{ele.categoryNames}]</span> {ele.title}
                  </span>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className={`${styles.flex} ${styles.alignCenter}`}>
                  <span className={styles.a}>A</span>
                  <div dangerouslySetInnerHTML={{ __html: ele.content }} className={styles.content} />
                </div>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <>{t('noneList')}</>
        )}
        {totalPage > 0 && <Pagination defaultPage={page} count={totalPage} paginationClick={paginationClick} />}
      </div>
    </section>
  )
}

export default FaqList
