import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import { useRecoilState } from 'recoil'
import { toastStatus } from '@modules/recoil/ToastHandleRecoil'
const Toast = ({ content, status }: { content: string; status: string }): JSX.Element => {
  const [state, setState] = useRecoilState(toastStatus)
  const { vertical, horizontal, open } = state
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setState({ open: false, vertical: 'bottom', horizontal: 'center' })
  }
  return (
    <>
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} onClose={handleClose} key={vertical + horizontal} autoHideDuration={2000}>
        <div style={{ background: '#26282B', color: '#fff', height: '50px', padding: '0 150px', borderRadius: '10px', marginBottom: '20px' }}>
          <i>{status === 'success' ? <img src={`${process.env.PUBLIC_URL}/assets/img/check_success.svg`} alt="" /> : <img src={`${process.env.PUBLIC_URL}/assets/img/check_fail.svg`} alt="" />}</i>
          <span style={{ lineHeight: '50px', paddingLeft: '5px', fontSize: '14px', fontWeight: '700' }}>{content}</span>
        </div>
      </Snackbar>
    </>
  )
}

export default Toast
