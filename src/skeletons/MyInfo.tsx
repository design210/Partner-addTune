import styles from '@style/myInfo/myInfo.module.scss'
import React from 'react'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'

const MyInfo = (): JSX.Element => {
  return (
    <section className={styles.myInfoWrap}>
      <Typography variant="h2" style={{ textAlign: 'center' }}>
        <Skeleton width={170} animation="wave" style={{ margin: '0 auto' }} />
      </Typography>
      <table className={`${styles.infoTbl} ${styles.mt40}`}>
        <colgroup>
          <col width="140" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th>
              <Skeleton variant="text" width={80} height={30} animation="wave" />
            </th>
            <td>
              <Skeleton variant="text" width={360} height={30} animation="wave" />
            </td>
          </tr>
          <tr>
            <th>
              <Skeleton variant="text" width={80} height={30} animation="wave" />
            </th>
            <td>
              <Skeleton variant="text" width={360} height={30} animation="wave" />
            </td>
          </tr>
          <tr>
            <th>
              <Skeleton variant="text" width={80} height={30} animation="wave" />
            </th>
            <td>
              <Skeleton variant="text" width={360} height={30} animation="wave" />
            </td>
          </tr>
          <tr>
            <th>
              <Skeleton variant="text" width={80} height={30} animation="wave" />
            </th>
            <td>
              <Skeleton variant="text" width={360} height={30} animation="wave" />
            </td>
          </tr>
          <tr>
            <th>
              <Skeleton variant="text" width={80} height={30} animation="wave" />
            </th>
            <td>
              <Skeleton variant="text" width={360} height={30} animation="wave" />
            </td>
          </tr>
          <tr>
            <th>
              <Skeleton variant="text" width={80} height={30} animation="wave" />
            </th>
            <td>
              <Skeleton variant="text" width={360} height={30} animation="wave" />
            </td>
          </tr>
          <tr>
            <th>
              <Skeleton variant="text" width={80} height={30} animation="wave" />
            </th>
            <td>
              <Skeleton variant="text" width={360} height={30} animation="wave" />
            </td>
          </tr>
          <tr>
            <th>
              <Skeleton variant="text" width={80} height={30} animation="wave" />
            </th>
            <td>
              <Skeleton variant="text" width={360} height={30} animation="wave" />
            </td>
          </tr>
          <tr>
            <th>
              <Skeleton variant="text" width={80} height={30} animation="wave" />
            </th>
            <td>
              <Skeleton variant="text" width={360} height={30} animation="wave" />
            </td>
          </tr>
          <tr>
            <th>
              <Skeleton variant="text" width={80} height={30} animation="wave" />
            </th>
            <td>
              <Skeleton variant="text" width={360} height={30} animation="wave" />
            </td>
          </tr>
          <tr>
            <th>
              <Skeleton variant="text" width={80} height={30} animation="wave" />
            </th>
            <td>
              <Skeleton variant="text" width={360} height={30} animation="wave" />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export default MyInfo
