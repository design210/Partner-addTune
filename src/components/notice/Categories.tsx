import React, { useState, useEffect, useRef } from 'react'
import { common } from '@api/common/Common'
import { useQuery } from 'react-query'
import { responseType, sysCodeArray } from '../../types/common'
import styles from '@style/board/Board.module.scss'
import { useTranslation } from 'react-i18next'
const Categories = ({ onclick, id, setDefault }: { onclick: (sid: string) => void; id: string; setDefault?: string }): JSX.Element => {
  const { t } = useTranslation()
  const [code, setCode] = useState<sysCodeArray[]>([])
  const [select, setSelect] = useState('')
  const list = useRef(null)
  const { refetch, data } = useQuery<responseType, Error>(['getCode', id], async id => await common(id), {
    suspense: false,
    enabled: true,
    onSuccess: data => {
      data.message === 'reFetch' ? refetch() : setCode(data.data)
    },
  })
  useEffect(() => {
    if (data) {
      setCode(data.data)
    }
  }, [data])
  const categorySelect = (sid: string) => {
    onclick(sid)
    setSelect(sid)
    window.scrollTo(0, 0)
  }
  /*목록으로 돌아갈때 카테고리 디폴트 세팅*/
  useEffect(() => {
    setDefault && setSelect(setDefault)
  }, [setDefault])
  return (
    <ul className={`${styles.categories} ${styles.flex} ${styles.justifyCenter}`} ref={list}>
      <li onClick={() => categorySelect('')} className={select === '' ? `${styles.active}` : ''}>
        {t('all')}
      </li>
      {code.length > 0 &&
        code.map(ele => (
          <li key={ele.sid} onClick={() => categorySelect(ele.sid)} className={select === ele.sid ? `${styles.active}` : ''}>
            {ele.name}
          </li>
        ))}
    </ul>
  )
}

export default React.memo(Categories)
