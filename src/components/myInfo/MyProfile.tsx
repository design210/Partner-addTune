import React, { useEffect, useState, useCallback } from 'react'
import { SelectChangeEvent } from '@mui/material/Select'
import SelectBasic from '@components/form/SelectBasic'
import styles from '@style/myInfo/myInfo.module.scss'
import Button from '@components/common/Button'
import useInput from '@hooks/useInput'
import FileUpload from '@components/form/FileUpload'
import { useQuery, useMutation } from 'react-query'
import { myProfile, bankType } from '../../types/myInfo'
import { bankNmCk, myPofile, profileEdit } from '@api/myInfo'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import { modifyLoadingConfirm, myProfileState, uploadFiles, modifyStatusState } from '@modules/recoil/MyProfile'
import { ModalState } from '@modules/recoil/ModalRecoil'
import FindZip from '@components/modal/FindZip'
import { zipState } from '@modules/recoil/MyProfile'
import { uploadFileListData } from '@modules/recoil/FileList'
import Confirm from '@components/modal/Confirm'
import Toast from '@components/form/Toast'
import { toastStatus } from '@modules/recoil/ToastHandleRecoil'
import { loadingFixed } from '@modules/recoil/Common'
import useDidMountEffect from '@hooks/useDidMountEffect'
import { useLocation } from 'react-router'
import QueryString from 'qs'
import { responseType } from '../../types/common'
import { useTranslation } from 'react-i18next'
const MyProfile = (): JSX.Element => {
  const { t } = useTranslation()
  const location = useLocation()
  const queryData = QueryString.parse(location.search, { ignoreQueryPrefix: true }) //쿼리 스트링
  const [dataLoading, setDataLoading] = useRecoilState(loadingFixed) //로딩
  const [uploadFileData, setUploadFileData] = useRecoilState(uploadFiles) //기존 파일 데이터
  const lastFileData = useRecoilValue(uploadFileListData) //업로드 파일 데이터
  const [refetchConfirm, setRefetchConfirm] = useRecoilState(modifyLoadingConfirm) //수정 컨펌일경우만 리패치
  const [modifyStatus, setModifyStatus] = useRecoilState(modifyStatusState) // 수정상태
  const findAddress = useRecoilValue(zipState)
  const setToast = useSetRecoilState(toastStatus)
  const [profileState, setProfileState] = useRecoilState(myProfileState) // Me 데이터
  const [reset, setReset] = useState(false) //필드 초기화
  const { refetch, data } = useQuery<responseType, Error>('myProfile', async () => await myPofile(), {
    suspense: true,
    enabled: true,
    staleTime: 0,
    onSuccess: data => {
      if (data.message === 'reFetch') {
        refetch()
      } else {
        setProfileState(data.data.me)
        setUploadFileData(data.data.files)
      }
    },
  })
  /*데이터 로딩후 리로드*/
  useDidMountEffect(() => {
    if (refetchConfirm) {
      if (!dataLoading) refetch()
      setRefetchConfirm(false)
    }
  }, [dataLoading])

  /*셀렉트 코드 props & 승인상태 */
  useEffect(() => {
    setNationCode(profileState.nation as string)
    setBankCode(profileState.bank as string)
    setCompanyType(profileState.kind as string)
    if (profileState.approval === 'SYS22629B004') {
      setModalState({
        status: true,
        title: t('approvalReady'),
        width: 360,
        closeBtn: false,
        confirm: true,
        element: <Confirm cancelBtn={false} cancelName="" confirmName="확인" onclick={check} historyBack={false} />,
      })
    } else if (profileState.approval === 'SYS22629B005') {
      setModalState({
        status: true,
        title: t('approvalReject'),
        width: 360,
        closeBtn: false,
        confirm: true,
        element: <Confirm cancelBtn={false} cancelName="" confirmName="확인" onclick={check} historyBack={false} />,
      })
    }
  }, [profileState])
  const check = () => {
    setModalState({ status: false })
  }
  /*주소 검색*/
  useEffect(() => {
    if (findAddress.address) {
      const dataReset = Object.assign({}, data!.data.me)
      dataReset.zipCode = findAddress.zipCode
      dataReset.address1 = findAddress.address
      dataReset.address2 = ''
      // @ts-ignore
      setProfileState(dataReset)
    }
  }, [findAddress])
  useEffect(() => {
    /*수정 상태로 진입*/
    if (queryData.status === 'modify') {
      setModifyStatus(true)
    }
    return () => {
      refetch() //데이터 변경 후 저정하지 않고 페이지 변경했을때 리패치
    }
  }, [])
  /*주소찾기 모달*/
  const setModalState = useSetRecoilState(ModalState)
  const findZip = useCallback((): void => {
    setModalState({
      status: true,
      title: t('findZip'),
      width: 620,
      closeBtn: true,
      confirm: false,
      element: <FindZip />,
    })
  }, [])
  /*인풋 설정*/
  const company = useInput({ initialState: profileState.name, reset })
  const companyNum = useInput({ initialState: profileState.crNum, reset })
  /*사업자 등록번호 자릿수 체크*/
  const [companyNumError, setCompanyNumError] = useState(false)
  useEffect(() => {
    let num = companyNum.value.length
    let count = companyNum.value.split('-').length - 1
    let total = num - count
    total > 10 ? setCompanyNumError(true) : setCompanyNumError(false)
  }, [companyNum.value])
  const corporationNum = useInput({ initialState: profileState.btNum, reset })
  /*법인 등록번호 자릿수 체크*/
  const [corporationNumError, setCorporationNumError] = useState(false)
  useEffect(() => {
    let num = corporationNum.value.length
    let count = corporationNum.value.split('-').length - 1
    let total = num - count
    total > 14 ? setCorporationNumError(true) : setCorporationNumError(false)
  }, [corporationNum.value])

  const ceo = useInput({ initialState: profileState.ceo, reset })
  const sector = useInput({ initialState: profileState.industries, reset })
  const businessStatus = useInput({ initialState: profileState.typeOfBusiness, reset })
  const zip = useInput({ initialState: profileState.zipCode, reset })
  const address1 = useInput({ initialState: profileState.address1, reset })
  const address2 = useInput({ initialState: profileState.address2, reset })
  const tel = useInput({ initialState: profileState.tel, reset })
  const email = useInput({ initialState: profileState.email, reset })
  const bankNum = useInput({ initialState: profileState.bankAccount, reset })
  const name = useInput({ initialState: profileState.bankAccountHolder, reset })
  /*국가 셀렉트*/
  const [nationCode, setNationCode] = useState<string>('')
  const handleChangeNation = useCallback(
    (e: SelectChangeEvent) => {
      setNationCode(e.target.value as string)
    },
    [nationCode],
  )
  /*은행 셀렉트*/
  const [bankCode, setBankCode] = useState<string>('')
  const handleChangeBank = useCallback(
    (e: SelectChangeEvent) => {
      setBankCode(e.target.value as string)
    },
    [bankCode],
  )
  /*회사 타입 설렉스*/
  const [companyType, setCompanyType] = useState<string>('')
  const handleChangeCompany = useCallback(
    (e: SelectChangeEvent) => {
      setCompanyType(e.target.value as string)
    },
    [companyType],
  )
  /*수정버튼*/
  const modify = () => {
    setReset(prev => !prev)
    setNationCode(profileState.nation as string)
    setBankCode(profileState.bank as string)
    setCompanyType(profileState.kind as string)
    setModifyStatus(true)
  }
  /*취소*/
  const cancel = useCallback(() => {
    setModalState({
      status: true,
      title: t('changeInfo1'),
      titleColumn2: t('changeInfo2'),
      width: 360,
      closeBtn: false,
      confirm: true,
      element: <Confirm cancelBtn={true} cancelName={t('close')} confirmName={t('save')} onclick={confirm} historyBack={true} />,
    })
  }, [])
  /*저장*/
  const save = useCallback(() => {
    if (companyNumError) {
      setModalState({
        status: true,
        title: t('errorCnNum'),
        width: 360,
        closeBtn: false,
        confirm: true,
        element: <Confirm cancelBtn={false} cancelName="" confirmName="확인" onclick={check} historyBack={false} />,
      })
      return
    }
    if (corporationNumError) {
      setModalState({
        status: true,
        title: t('errorBnNum'),
        width: 360,
        closeBtn: false,
        confirm: true,
        element: <Confirm cancelBtn={false} cancelName="" confirmName="확인" onclick={check} historyBack={false} />,
      })
      return
    }
    setModalState({
      status: true,
      title: t('changeInfo3'),
      width: 360,
      closeBtn: false,
      confirm: true,
      element: <Confirm cancelBtn={true} cancelName={t('cancel')} confirmName={t('okay')} onclick={confirm} historyBack={false} confirmBack={true} />,
    })
  }, [companyNumError, corporationNumError])
  /*회원정보 수정*/
  const confirm = (status: string) => {
    if (status === 'historyBack') {
      setModifyStatus(false)
      refetch()
    } else if (status === 'okay') {
      setModalState({ status: false })
      setDataLoading(true)
      setRefetchConfirm(true)
      modifyProfile.mutate()
    } else if (status === 'okayWidthBack') {
      setModalState({ status: false })
      setDataLoading(true)
      setRefetchConfirm(true)
      modifyProfile.mutate()
      setModifyStatus(false)
      window.scrollTo(0, 0)
      setModalState({
        status: true,
        title: t('approvalSave'),
        width: 360,
        closeBtn: false,
        confirm: true,
        element: <Confirm cancelBtn={false} cancelName="" confirmName="확인" onclick={check} historyBack={false} />,
      })
    }
  }
  /*회원정보 수정 */
  const modifyProfile = useMutation<any, Error>(
    () => {
      return profileEdit({
        nation: nationCode,
        kind: companyType,
        name: company.value,
        crNum: companyNum.value,
        btNum: corporationNum.value,
        ceo: ceo.value,
        industries: sector.value,
        typeOfBusiness: businessStatus.value,
        zipCode: zip.value,
        address1: address1.value,
        address2: address2.value,
        tel: tel.value,
        email: email.value,
        bank: bankCode,
        bankAccount: bankNum.value,
        bankAccountHolder: name.value,
        files: lastFileData,
      })
    },
    {
      mutationKey: 'signInMutation',
      onError: error => {
        setDataLoading(false)
      },
      onSuccess: (data: any) => {
        refetch()
        setDataLoading(false)
      },
    },
  )
  /* 계좌 확인 */
  const certification = useMutation<any, Error, bankType>(
    data => {
      setDataLoading(true)
      return bankNmCk(data)
    },
    {
      mutationKey: 'bankNmCk',
      onError: error => {
        setDataLoading(false)
      },
      onSuccess: (data: any) => {
        if (data) {
          setDataLoading(false)
          data.code === 200 && setToast({ open: true, vertical: 'bottom', horizontal: 'center' })
        }
      },
    },
  )
  /*사업자등록번호, 법인번호, 계좌번호 변경 확인*/
  const [modifyState, setModifyState] = useState(false)
  const businessNumTemp = profileState.crNum
  const btNumTemp = profileState.btNum
  const bnkNumTemp = profileState.bankAccount
  useEffect(() => {
    businessNumTemp !== companyNum.value || btNumTemp !== corporationNum.value || bnkNumTemp !== bankNum.value ? setModifyState(true) : setModifyState(false)
  }, [companyNum.value, corporationNum.value, bankNum.value])

  return (
    <section className={styles.myInfoWrap}>
      <div className={styles.header}>
        {!modifyStatus ? (
          <h1>
            {profileState.name} {t('info')}
          </h1>
        ) : (
          <>
            <h1>
              {profileState.name} {t('infoModify')}
            </h1>
            <p className={`${styles.subTitle} ${styles.mt10}`}>{t('infoModifyText')}</p>
          </>
        )}
        {!modifyStatus ? <Button name={t('modify')} onclick={modify} className="btnblueBg" /> : null}
      </div>
      <table className={`${styles.infoTbl} ${styles.mt40}`}>
        <caption>
          {profileState.name} {t('info')}
        </caption>
        <colgroup>
          <col width="140" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th>{t('nationCode')}</th>
            <td>{modifyStatus ? <SelectBasic change={handleChangeNation} value={nationCode} id="SYS21729B003" width={356} /> : <>{profileState.nationName}</>}</td>
          </tr>
          <tr>
            <th>{t('businessClassification')}</th>
            <td>{modifyStatus ? <SelectBasic change={handleChangeCompany} value={companyType} id="SYS21730B231" width={356} /> : <>{profileState.kindName}</>}</td>
          </tr>
          <tr>
            <th>{t('companyName')}</th>
            <td>{modifyStatus ? <input type="text" {...company} /> : <>{profileState.name}</>}</td>
          </tr>
          <tr>
            <th>{t('businessNum')}</th>
            <td className={companyNumError ? `${styles.lengthError}` : ''}>
              {modifyStatus ? (
                <>
                  <input type="text" {...companyNum} />
                  <i />
                </>
              ) : (
                <>{profileState.crNum}</>
              )}
            </td>
          </tr>
          <tr>
            <th>{t('bnNum')}</th>
            <td className={corporationNumError ? `${styles.lengthError}` : ''}>
              {modifyStatus ? (
                <>
                  <input type="text" {...corporationNum} />
                  <i />
                </>
              ) : (
                <>{profileState.btNum}</>
              )}
            </td>
          </tr>
          <tr>
            <th>{t('ceo')}</th>
            <td>{modifyStatus ? <input type="text" {...ceo} /> : <>{profileState.ceo}</>}</td>
          </tr>
          <tr>
            <th>{t('industry2')}</th>
            <td>{modifyStatus ? <input type="text" {...sector} /> : <>{profileState.industries}</>}</td>
          </tr>
          <tr>
            <th>{t('businessCondition')}</th>
            <td>{modifyStatus ? <input type="text" {...businessStatus} /> : <>{profileState.typeOfBusiness}</>}</td>
          </tr>
          <tr>
            <th>{t('address')}</th>
            <td>
              {modifyStatus ? (
                <>
                  <div className={`${styles.mb5} ${styles.flex} ${styles.alignCenter}`}>
                    <input type="text" {...zip} className={`${styles.zip} ${styles.mr5}`} readOnly />
                    <Button onclick={findZip} className="btnBlueGrayLine" name={t('zipSearch')} />
                  </div>
                  <div>
                    <input type="text" {...address1} readOnly />
                    <input type="text" {...address2} className={`${styles.ml10}`} placeholder={t('addressEtc')} />
                  </div>
                </>
              ) : (
                <>
                  {profileState.address1} {profileState.address2}
                </>
              )}
            </td>
          </tr>
          <tr>
            <th>{t('tel')}</th>
            <td>{modifyStatus ? <input type="text" {...tel} /> : <>{profileState.tel}</>}</td>
          </tr>
          <tr>
            <th>{t('email')}</th>
            <td>{modifyStatus ? <input type="text" {...email} /> : <>{profileState.email}</>}</td>
          </tr>
          <tr>
            <th>{t('bank')}</th>
            <td>
              {modifyStatus ? (
                <>
                  <SelectBasic change={handleChangeBank} value={bankCode} id="SYS21C30B100" width={190} />
                  <input type="text" {...bankNum} className={`${styles.bankNum} ${styles.ml10}`} />
                  <input type="text" {...name} className={`${styles.name} ${styles.ml10} ${styles.mr10}`} />
                  <Button onclick={() => certification.mutate({ crNum: companyNum.value, bank: bankCode, bankAccount: bankNum.value })} className="btnBlueGrayLine" name={t('certification')} />
                  <Toast content={t('bankComplete')} status="success" />
                </>
              ) : (
                <>
                  {profileState.bankName} {profileState.bankAccount} {profileState.bankAccountHolder}
                </>
              )}
            </td>
          </tr>
          {modifyStatus ? (
            <tr>
              <th>{t('file')}</th>
              <td>
                <FileUpload oldFiles={uploadFileData} isLoadingModify={modifyProfile.isLoading} single={false} alim={modifyState} />
              </td>
            </tr>
          ) : (
            <></>
          )}
        </tbody>
      </table>
      {modifyStatus ? (
        <div className={`${styles.flex} ${styles.justifyCenter} ${styles.mt50} ${styles.btnGroup}`}>
          <Button onclick={cancel} className="btnCancel" name={t('close')} />
          <Button onclick={save} className="btnConfirm" name={t('save')} />
        </div>
      ) : (
        <></>
      )}
    </section>
  )
}

export default MyProfile
