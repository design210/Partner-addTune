import React from 'react'
import Skeleton from '@mui/material/Skeleton'
import styles from '@style/common/skeleton.module.scss'
import stylesC from '@style/calculate/calculate.module.scss'
import Typography from '@mui/material/Typography'
const CalcMonths = (): JSX.Element => {
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
    <section className={`${styles.skeletonWrap} ${styles.mb100} ${styles.pl50} ${styles.pr50}`}>
      <Typography variant="h2" style={{ marginTop: '50px', textAlign: 'center' }}>
        <Skeleton width={600} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
      </Typography>
      <Skeleton variant="text" width={80} height={20} animation="wave" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
      <Skeleton variant="rectangular" width={1100} height={333} style={{ marginTop: '60px', borderRadius: '10px' }} animation="wave" />
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

export default CalcMonths
