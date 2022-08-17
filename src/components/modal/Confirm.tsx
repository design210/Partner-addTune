import React from 'react'
import Button from '@components/common/Button'
import { useSetRecoilState } from 'recoil'
import { ModalState } from '@modules/recoil/ModalRecoil'
import styles from '@style/common/modal.module.scss'
interface confirm {
  cancelBtn: boolean
  cancelName: string
  confirmName: string
  historyBack: boolean
  confirmBack?: boolean
  onclick: (status: string) => void
}
const Confirm = ({ cancelBtn, cancelName, confirmName, onclick, historyBack, confirmBack }: confirm): JSX.Element => {
  const setModalState = useSetRecoilState(ModalState)
  return (
    <section className={`${styles.confirmModalWrap} ${styles.flex} ${styles.justifyCenter} ${styles.mt30}`}>
      {cancelBtn && (
        <Button
          name={cancelName}
          onclick={() => {
            // if (confirmBack) {
            //   onclick('historyBack')
            // } else {
            historyBack ? onclick('historyBack') : onclick('cancel')
            // }
            setModalState({ status: false })
          }}
          className={`btnCancel xs ${styles.mr8}`}
        />
      )}
      <Button
        name={confirmName}
        onclick={() => {
          confirmBack ? onclick('okayWidthBack') : onclick('okay')
        }}
        className="btnConfirm xs"
      />
    </section>
  )
}

export default Confirm
