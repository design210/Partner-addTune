import React from 'react'
import styles from '@style/board/Board.module.scss'

const ErrorMessage = ({ msg }: { msg: string }): JSX.Element => {
  return <div className={`${styles.errorMessage} ${styles.mt5}`}>{msg}</div>
}

export default ErrorMessage
