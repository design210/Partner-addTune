import React from 'react'
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress'
import styles from '@style/common/common.module.scss'
const CircleProgress = ({ size, thickness }: { size: number; thickness: number }): JSX.Element => {
  return (
    <section className={styles.circularProgress}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: theme => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={size}
        thickness={thickness}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: theme => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={size}
        thickness={thickness}
      />
    </section>
  )
}

export default CircleProgress
