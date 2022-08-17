import React from 'react'
import usePagination from '@mui/material/usePagination'
import styles from '@style/board/Board.module.scss'
const Pagination = ({ count, paginationClick, defaultPage }: { count: number; paginationClick: any; defaultPage: any }): JSX.Element => {
  const { items } = usePagination({
    count,
    defaultPage,
  })
  const handlePageChange = () => {
    setTimeout(() => {
      const target = document.querySelector('.pagination-selected')
      paginationClick(target!.textContent)
    }, 200)
  }
  return (
    <div className={styles.paginationWrap}>
      <nav className={styles.pagination}>
        <ul>
          {items.map(({ page, type, selected, ...item }, index) => {
            let children = null

            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
              children = '…'
            } else if (type === 'page') {
              children = (
                <button
                  type="button"
                  style={{
                    fontWeight: selected ? 700 : undefined,
                    color: selected ? '#047FFF' : undefined,
                  }}
                  className={selected ? 'pagination-selected' : undefined}
                  {...item}
                >
                  {page}
                </button>
              )
            } else {
              children = (
                <button type="button" {...item} className={styles.paginationUi}>
                  {type === 'next' ? <img src={`${process.env.PUBLIC_URL}/assets/img/next.svg`} alt="next" /> : <img src={`${process.env.PUBLIC_URL}/assets/img/prev.svg`} alt="prev" />}
                </button>
              )
            }
            return (
              <li key={index} onClick={handlePageChange}>
                {children}
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
