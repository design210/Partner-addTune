import React, { useState, useRef, useEffect } from 'react'
import styles from '@style/myInfo/myInfo.module.scss'
import { useMutation } from 'react-query'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { uploadFileListData } from '@modules/recoil/FileList'
import { file } from '../../types/myInfo'
import { fileDelete } from '@api/myInfo'
import { loadingFixed } from '@modules/recoil/Common'
import useDidMountEffect from '@hooks/useDidMountEffect'
import Confirm from '@components/modal/Confirm'
import { ModalState } from '@modules/recoil/ModalRecoil'
import { uploadFiles, deleteFileSid } from '@modules/recoil/MyProfile'
import { useTranslation } from 'react-i18next'
const FileUpload = ({ oldFiles, isLoadingModify, single, alim }: { oldFiles: any; isLoadingModify: boolean; single: boolean; alim?: boolean }): JSX.Element => {
  const { t } = useTranslation()
  const [deleteFileId, setDeleteFileId] = useRecoilState(deleteFileSid) //삭제파일 sid
  const [fileListData, setFileListData] = useRecoilState<any>(uploadFileListData) //최종 파일
  const [tempFiles, setTempFiles] = useState<any>([]) //파일 임시 저장
  const [fileSize, setFileSize] = useState<boolean[]>([]) //용량체크
  const setLoadingFixed = useSetRecoilState(loadingFixed) //로딩 상태
  const [uploadFileData, setUploadFileData] = useRecoilState(uploadFiles) //기존 파일 데이터
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTempFiles(e.target.files as FileList)
    const list = Array.from(e.target.files as FileList)
    const totalLength = list.length + oldFiles.length
    let limit = 0
    single ? (limit = 1) : (limit = 3)
    if (totalLength > limit) {
      alert(`${t('fileUploadIs')} ${limit}${t('fileUploadPossible')}`)
      return
    }
    setFileSize([])
    list.forEach(function (ele) {
      if (ele.size > 3000000) {
        alert(t('fileSize'))
        setFileSize(prev => [...prev, false])
      } else {
        setFileSize(prev => [...prev, true])
      }
    })
  }
  useEffect(() => {
    if (fileSize.length > 0) {
      let result = fileSize.every(function (value) {
        if (!value) {
          return false
        }
        return true
      })
      setTimeout(() => {
        result && setFileListData(tempFiles)
      }, 300)
    }
  }, [fileSize])

  const onTrigger = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    onTrigger.current!.click()
  }
  const deleteFile = (delIndex: number) => {
    const dataTranster = new DataTransfer()
    Array.from(fileListData)
      .filter((file, index) => index !== delIndex)
      .forEach(file => {
        dataTranster.items.add(file as File)
      })
    // @ts-ignore
    document.querySelector('#file').files = dataTranster.files
    setFileListData(dataTranster.files)
  }
  /*기존파일 삭제 컨펌*/
  const setModalState = useSetRecoilState(ModalState)
  const deleteConfirm = (sid: string) => {
    setModalState({
      status: true,
      title: t('fileDelete'),
      width: 360,
      closeBtn: false,
      confirm: true,
      element: (
        <Confirm
          cancelBtn={true}
          historyBack={false}
          cancelName={t('cancel')}
          confirmName={t('okay')}
          onclick={(status: string) => {
            if (status === 'okay') {
              setDeleteFileId(sid)
              mutate(sid)
              setModalState({ status: false })
            }
          }}
        />
      ),
    })
  }
  /*기존파일 삭제*/
  const { isLoading, mutate, isSuccess } = useMutation<any, Error, string>(
    (id: string) => {
      return fileDelete(id)
    },
    {
      mutationKey: 'deleteFileMutation',
      onError: error => {
        setLoadingFixed(false)
      },
    },
  )
  useEffect(() => {
    if (isSuccess) {
      let list: any[] = []
      uploadFileData.filter((ele: any) => {
        if (ele.sid !== deleteFileId) {
          list.push(ele)
        }
      })
      setUploadFileData(list)
    }
  }, [deleteFileId, isSuccess])

  /*로딩*/
  useEffect(() => {
    isLoading ? setLoadingFixed(true) : setLoadingFixed(false)
  }, [isLoading])
  /*수정 상태 확인 : 수정 완료시*/
  useDidMountEffect(() => {
    if (!isLoadingModify) {
      setFileListData([])
    }
  }, [isLoadingModify])

  return (
    <>
      <div className={`${styles.fileUploadWrap} ${styles.flex}`}>
        <div onClick={handleClick} className={styles.fileUpload}>
          <i>
            <img src={`${process.env.PUBLIC_URL}/assets/img/file_add.svg`} alt="" />
          </i>
          {t('fileAdd')}
        </div>
        <div className={styles.infoWrap}>
          {!single && alim ? <p className={styles.alim}>{t('fileInfo1')}</p> : null}
          <ul>
            <li>
              {t('fileInfo2')} {!single ? 3 : 1}
              {t('fileUploadPossible2')})
            </li>
            <li>{t('fileInfo3')} </li>
          </ul>
        </div>
      </div>
      <ul className={`${styles.fileList} ${styles.mt20}`}>
        {oldFiles
          ? oldFiles.map((ele: file, index: number) => (
              <li key={ele.sid}>
                {ele.name}
                <i onClick={() => deleteConfirm(ele.sid)}>
                  <img src={`${process.env.PUBLIC_URL}/assets/img/file_delete.svg`} alt="delete" />
                </i>
              </li>
            ))
          : null}
      </ul>
      <ul className={styles.fileList}>
        {fileListData.length > 0
          ? Array.from(fileListData).map((ele: any, index: number) => (
              <li key={index}>
                {ele.name}
                <i onClick={() => deleteFile(index)}>
                  <img src={`${process.env.PUBLIC_URL}/assets/img/file_delete.svg`} alt="delete" />
                </i>
              </li>
            ))
          : null}
      </ul>
      <input type="file" id="file" onChange={handleChangeFile} multiple accept=".gif, .jpg, .png, .pdf" ref={onTrigger} className={styles.hidden} />
    </>
  )
}

export default React.memo(FileUpload)
