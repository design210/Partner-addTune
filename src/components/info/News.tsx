import React, { useState, useEffect } from 'react'
import styles from '@style/info/news.module.scss'
import { Masonry } from '@mui/lab'
import { useTranslation } from 'react-i18next'
const News = (): JSX.Element => {
  const { t } = useTranslation()
  const [state, setState] = useState('all')
  const tab = (status: string) => {
    setState(status)
  }
  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll)
    return () => {
      window.removeEventListener('scroll', infiniteScroll)
    }
  }, [])
  const infiniteScroll = () => {
    const { scrollHeight } = document.documentElement
    const { scrollTop } = document.documentElement
    const { clientHeight } = document.documentElement
    if (scrollTop >= scrollHeight - clientHeight) {
      console.log('더 불러오기')
    }
  }
  return (
    <>
      <h1 className={styles.title}>소식</h1>
      <nav className={styles.menu}>
        <ul className={`${styles.flex} ${styles.justifyCenter} ${styles.mt30}`}>
          <li className={state === 'all' ? `${styles.active}` : ''} onClick={() => tab('all')}>
            {t('all')}
          </li>
          <li className={state === 'press' ? `${styles.active}` : ''} onClick={() => tab('press')}>
            {t('newsMenu1')}
          </li>
          <li className={state === 'blog' ? `${styles.active}` : ''} onClick={() => tab('blog')}>
            {t('newsMenu2')}
          </li>
        </ul>
      </nav>
      <section className={`${styles.masonry} ${styles.mt70}`}>
        <Masonry columns={3} spacing={2}>
          <div className={styles.newWrap}>
            <img src={`${process.env.PUBLIC_URL}/assets/img/ex1.jpg`} alt="" />
            <p className={`${styles.mt15} ${styles.mb80}`}>
              직무 인터뷰는 무슨 말을 할까? 상세페이지에는 어떤 내용이 들어가지 에디터가 붙으면 신경안써도되나? 직무 인터뷰는 무슨 말을 할까? 상세페이지에는 어떤 내용이 들어가지 에디터가 붙으면
              신경안써도되나?
            </p>
          </div>
          <div className={styles.newWrap}>
            <img src={`${process.env.PUBLIC_URL}/assets/img/ex2.jpg`} alt="" />
            <p className={`${styles.mt15} ${styles.mb80}`}>직무 인터뷰는 무슨 말을 할까? 상세페이지에는 어떤 내용이 들어가지 에디터가 붙으면 신경안써도되나?</p>
          </div>
          <div className={styles.newWrap}>
            <img src={`${process.env.PUBLIC_URL}/assets/img/ex3.jpg`} alt="" />
            <p className={`${styles.mt15} ${styles.mb80}`}>직무 인터뷰는 무슨 말을 할까? 상세페이지에는 어떤 내용이 들어가지 에디터가 붙으면 신경안써도되나?</p>
          </div>
          <div className={styles.newWrap}>
            <img src={`${process.env.PUBLIC_URL}/assets/img/ex2.jpg`} alt="" />
            <p className={`${styles.mt15} ${styles.mb80}`}>직무 인터뷰는 무슨 말을 할까? 상세페이지에는 어떤 내용이 들어가지 에디터가 붙으면 신경안써도되나?</p>
          </div>
          <div className={styles.newWrap}>
            <img src={`${process.env.PUBLIC_URL}/assets/img/ex1.jpg`} alt="" />
            <p className={`${styles.mt15} ${styles.mb80}`}>직무 인터뷰는 무슨 말을 할까? 상세페이지에는 어떤 내용이 들어가지 에디터가 붙으면 신경안써도되나?</p>
          </div>
        </Masonry>
      </section>
    </>
  )
}

export default News
