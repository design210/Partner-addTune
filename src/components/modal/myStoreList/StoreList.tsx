import React from 'react'
import styles from '@style/common/modal.module.scss'
import CircularProgress from '@components/common/CircleProgress'
import { storeListType } from '../../../types/myStoreList'
import { useTranslation } from 'react-i18next'
interface propsType {
  list: Array<storeListType>
  more: () => void
  totalElements: number
  loading: boolean
}
const StoreList = ({ list, more, totalElements, loading }: propsType): JSX.Element => {
  const { t } = useTranslation()
  return (
    <>
      <div className={`${styles.mt15} ${styles.storeList}`}>
        <ul>
          {list.map(ele => (
            <li key={ele.sid}>
              <section className={`${styles.content}`}>
                <div>
                  <span className={styles.storeName}>{ele.storeName}</span>
                </div>
                <p className={styles.mt5}>
                  <span className={`${styles.subject} ${styles.mt3}`}>{t('adName')} : </span> {ele.title}
                </p>
                <p>
                  <span className={`${styles.subject} ${styles.mt3}`}>{t('adRange')} : </span> {ele.period}
                </p>
              </section>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${styles.mt30} ${styles.moreBtn}`}>
        {totalElements > list.length ? (
          <button onClick={more} className={styles.relative}>
            {loading ? (
              <div className={styles.circularProgressWrap}>
                <CircularProgress size={20} thickness={6} />
              </div>
            ) : (
              <>
                <i>
                  <img src={`${process.env.PUBLIC_URL}/assets/img/plus_blue.svg`} alt="" />
                </i>
                {t('moreView')}
              </>
            )}
          </button>
        ) : null}
      </div>
    </>
  )
}

export default StoreList
