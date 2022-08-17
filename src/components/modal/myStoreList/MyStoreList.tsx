import React from 'react'
import styles from '@style/common/modal.module.scss'
import StoreList from '@components/modal/myStoreList/StoreList'
import { myStoreList } from '@api/dashboard'
import { useQuery } from 'react-query'
import { storesType } from '../../../types/myStoreList'
import { useRecoilState } from 'recoil'
import { dashboardStoreListState, storeListPage } from '@modules/recoil/DashboardStoreList'
import { responseType } from '../../../types/common'
import { useTranslation } from 'react-i18next'
const MyStoreList = (): JSX.Element => {
  const { t } = useTranslation()
  const [storeListState, setStoreListState] = useRecoilState(dashboardStoreListState) // 데이터
  const [page, setPage] = useRecoilState(storeListPage) // 데이터
  const { refetch, isLoading } = useQuery<responseType, Error>(['myStoreListModal', { size: 5, page }], async queryKey => await myStoreList(queryKey), {
    suspense: false,
    enabled: true,
    onSuccess: data => {
      data.message === 'reFetch'
        ? refetch()
        : setStoreListState({ header: data.data.header, content: [...storeListState.content, ...data.data.body!.content], totalElements: data.data.body!.totalElements })
    },
  })
  const more = () => {
    setPage(page => page + 1)
  }
  return (
    <section className={`${styles.storeListWrap} ${styles.mt15}`}>
      <div className={styles.total}>
        {t('totalAd')} {storeListState.header.total}
        {t('few')}
        <ul className={`${styles.storeHeaderList} ${styles.flex} ${styles.mt6}`}>
          {storeListState.header.stores.map((ele: storesType, index: number) => (
            <li key={index}>
              {ele.name} {ele.count}
              {t('few')}
            </li>
          ))}
        </ul>
      </div>
      <StoreList list={storeListState.content} more={more} totalElements={storeListState.totalElements} loading={isLoading} />
    </section>
  )
}

export default MyStoreList
