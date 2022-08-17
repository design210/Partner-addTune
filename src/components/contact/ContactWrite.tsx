import React, { useCallback, useState, useEffect } from 'react'
import styles from '@style/board/Board.module.scss'
import SelectBasic from '@components/form/SelectBasic'
import { SelectChangeEvent } from '@mui/material/Select'
import useInput from '@hooks/useInput'
import FileUpload from '@components/form/FileUpload'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { uploadFileListData } from '@modules/recoil/FileList'
import Button from '@components/common/Button'
import { useMutation, useQueryClient } from 'react-query'
import { setContact } from '@api/board'
import { loadingFixed } from '@modules/recoil/Common'
import Confirm from '@components/modal/Confirm'
import { ModalState } from '@modules/recoil/ModalRecoil'
import { contactListTab, contactTab } from '@modules/recoil/BoardRecoil'
import ErrorMessage from '@components/common/ErrorMessage'
import { useTranslation } from 'react-i18next'
const ContactWrite = (): JSX.Element => {
  const { t } = useTranslation()
  const setTab = useSetRecoilState(contactTab) //문의하가, 게시판 tab
  const setTabView = useSetRecoilState(contactListTab) //리스트, 뷰 tab
  const setModalState = useSetRecoilState(ModalState) // 모달
  const setLoadingFixed = useSetRecoilState(loadingFixed) //로딩 상태
  const [type, setType] = useState(false) //validate
  const [title, setTitle] = useState(false)
  const [contents, setContents] = useState(false)
  const [fileListData, setFileListData] = useRecoilState<any>(uploadFileListData) //최종 파일
  const queryClient = useQueryClient()
  /*분류 셀렉트*/
  const [code, setCode] = useState<string>('')
  const handleChange = useCallback(
    (e: SelectChangeEvent) => {
      setCode(e.target.value as string)
    },
    [code],
  )
  useEffect(() => {
    setFileListData([])
  }, [])
  /*인풋 설정*/
  const subject = useInput({ initialState: '' })
  const content = useInput({ initialState: '' })
  /*회원정보 수정 */
  const confirm = () => {
    if (code === '') {
      setType(true)
    }
    if (subject.value === '') {
      setTitle(true)
    }
    if (content.value === '') {
      setContents(true)
    }
    if (code !== '' && subject.value !== '' && content.value !== '') {
      mutate()
    }
  }
  useEffect(() => {
    if (code !== '') {
      setType(false)
    }
    if (subject.value !== '') {
      setTitle(false)
    }
    if (content.value !== '') {
      setContents(false)
    }
  }, [code, subject.value, content.value])

  const { mutate, status } = useMutation<any, Error>(
    () => {
      return setContact({
        type: code,
        title: subject.value,
        content: content.value,
        files: fileListData,
      })
    },
    {
      mutationKey: 'setContact',
      onSuccess: () => {
        queryClient.invalidateQueries(['contactList'])
      },
    },
  )
  const check = () => {
    setModalState({ status: false })
    setTab(false)
    setTabView(true)
  }
  useEffect(() => {
    if (status === 'success') {
      setLoadingFixed(false)
      setModalState({
        status: true,
        title: t('questionReceipt'),
        width: 360,
        closeBtn: false,
        confirm: true,
        element: <Confirm cancelBtn={false} cancelName="" confirmName="확인" onclick={check} historyBack={false} />,
      })
    } else if (status === 'loading') {
      setLoadingFixed(true)
    } else if (status === 'error') {
      setLoadingFixed(false)
      setModalState({
        status: true,
        title: t('lateQuestion'),
        width: 360,
        closeBtn: false,
        confirm: true,
        element: <Confirm cancelBtn={false} cancelName="" confirmName="확인" onclick={check} historyBack={false} />,
      })
    }
  }, [status])
  return (
    <section className={`${styles.contactWriteWrap} ${styles.mt60}`}>
      <h2 className={`${styles.subTitle} ${styles.mb5}`}>{t('questionType')}</h2>
      <SelectBasic change={handleChange} value={code} id="SYS22707B002" width={540} error={type} />
      {type ? <ErrorMessage msg={t('selectQuestionType')} /> : null}
      <h2 className={`${styles.subTitle} ${styles.mb5} ${styles.mt24}`}>{t('questionContent')}</h2>
      <div className={`${styles.relative}`}>
        <input type="text" {...subject} maxLength={50} placeholder={t('title50')} className={title ? `${styles.error}` : ''} />
        {title ? <ErrorMessage msg={t('titleInit')} /> : null}
        <div className={styles.length}>{subject.value.length}/50</div>
      </div>
      <div className={`${styles.relative} ${styles.mb24}`}>
        <textarea {...content} maxLength={500} placeholder={t('content50')} className={contents ? `${styles.error}` : ''} />
        {contents ? <ErrorMessage msg={t('contentInit')} /> : null}
        <div className={styles.length2}>{content.value.length}/500</div>
      </div>
      <FileUpload oldFiles={[]} isLoadingModify={false} single={true} />
      <div className={styles.center}>
        <Button name={t('contact')} onclick={confirm} className="btnConfirm" />
      </div>
    </section>
  )
}

export default ContactWrite
