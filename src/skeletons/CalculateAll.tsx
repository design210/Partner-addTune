import styles from '@style/common/skeleton.module.scss'
import stylesC from '@style/calculate/calculate.module.scss'
import React from 'react'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'

const CalculateAll = (): JSX.Element => {
  const rendering = () => {
    const result = []
    for (let i = 0; i < 10; i++) {
      result.push(
        <tr key={i}>
          <td>
            <Skeleton variant="text" width={80} height={17} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
          </td>
          <td>
            <Skeleton variant="text" width={80} height={17} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
          </td>
          <td>
            <Skeleton variant="text" width={80} height={17} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
          </td>
          <td>
            <Skeleton variant="text" width={80} height={17} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
          </td>
          <td>
            <Skeleton variant="text" width={80} height={17} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
          </td>
          <td>
            <Skeleton variant="text" width={80} height={17} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
          </td>
          <td>
            <Skeleton variant="text" width={80} height={17} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
          </td>
        </tr>,
      )
    }
    return result
  }
  return (
    <section className={`${styles.skeletonWrap} ${styles.mt60} ${styles.mb100} ${styles.pl50} ${styles.pr50}`}>
      <Typography variant="h1" style={{ marginTop: '70px', textAlign: 'center' }}>
        <Skeleton width={300} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
      </Typography>
      <Skeleton variant="rectangular" width={1100} height={333} style={{ marginTop: '10px', borderRadius: '10px' }} animation="wave" />
      <table className={`${stylesC.calculateTbl} ${styles.mt70}`}>
        <caption>1년 정산 금액</caption>
        <thead>
          <tr>
            <th>
              <Skeleton variant="text" width={80} height={17} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
            </th>
            <th>
              <Skeleton variant="text" width={80} height={17} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
            </th>
            <th>
              <Skeleton variant="text" width={80} height={17} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
            </th>
            <th>
              <Skeleton variant="text" width={80} height={17} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
            </th>
            <th>
              <Skeleton variant="text" width={80} height={17} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
            </th>
            <th>
              <Skeleton variant="text" width={80} height={17} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
            </th>
            <th>
              <Skeleton variant="text" width={80} height={17} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
            </th>
          </tr>
        </thead>
        <tbody>{rendering()}</tbody>
      </table>
    </section>
  )
}

export default CalculateAll
