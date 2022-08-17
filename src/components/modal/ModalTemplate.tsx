import React from 'react'
import { useRecoilState } from 'recoil'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modals from '@mui/material/Modal'
import styles from '@style/common/modal.module.scss'

import { ModalState } from '@modules/recoil/ModalRecoil'
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 5,
}

const ModalTemplate: React.FC = (): JSX.Element => {
  const [modalState, setModalState] = useRecoilState(ModalState)
  const handleClose = (): void => {
    setModalState({ status: false })
  }

  return (
    <div>
      <Modals open={modalState.status} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} style={{ width: modalState.width }}>
          {modalState.closeBtn && (
            <div className={styles.modalCloseBtn} onClick={handleClose}>
              <img src={`${process.env.PUBLIC_URL}/assets/img/modal_close.svg`} alt="close" />
            </div>
          )}
          <Typography variant="h6" component="h2">
            {modalState.confirm ? (
              <div className={styles.modalConfirmTitle}>
                {modalState.title}
                <br />
                {modalState.titleColumn2}
              </div>
            ) : (
              <div className={styles.modalTitle}>
                {modalState.title}
                <br />
                {modalState.titleColumn2}
              </div>
            )}
          </Typography>
          <section>{modalState.element ? modalState.element : modalState.content}</section>
        </Box>
      </Modals>
    </div>
  )
}

export default ModalTemplate
