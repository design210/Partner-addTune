import styles from '@style/Login.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import useInput from '@hooks/useInput'
import useDidMountEffect from '@hooks/useDidMountEffect'
import { useMutation, useQueryClient } from 'react-query'
import { signIn } from '@api/login'
import { verifyEmail, CheckPassword } from '@utils/validate'
import { loginResType } from '../../types/member'
import { removeCookie, setCookie } from '@utils/cookie'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Login: React.FC = (): JSX.Element => {
  const { t } = useTranslation()
  const [disabled, setDisabled] = useState(true)
  const [idAlert, setIdAlert] = useState('')
  const [pwAlert, setPwAlert] = useState('')
  const idInit = useInput({ initialState: '' })
  const pwInit = useInput({ initialState: '' })
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  //초기 실행 방지 ref
  const didMountId = useRef(false)
  //아이디 감지 : 초기 실행 방어
  useDidMountEffect(() => {
    if (!didMountId.current) {
      didMountId.current = true
    } else {
      //이메일 유효성 체크
      const email = idInit.value && verifyEmail(idInit.value)
      email || email === '' ? setIdAlert('') : setIdAlert(t('loginAlert1'))
      //비밀번호 유효성 체크
      const password = pwInit.value && CheckPassword(pwInit.value)
      if (password === 'error-spe') {
        setPwAlert(t('loginAlert2'))
      } else if (password === 'error-length') {
        setPwAlert(t('loginAlert3'))
      } else if (password === '' || password) {
        setPwAlert('')
      }
      email && password === true ? setDisabled(false) : setDisabled(true)
    }
  }, [idInit.value, pwInit.value])
  //로그인 전송
  const sendData = useMutation<loginResType, Error>(
    () => {
      return signIn({
        email: idInit.value,
        pwd: pwInit.value,
      })
    },
    {
      mutationKey: 'signInMutation',
      onError: error => {
        const { code } = JSON.parse(error.message)
        code === 483 && setIdAlert(t('loginAlert4'))
        code === 484 && setPwAlert(t('loginAlert5'))
      },
      onSuccess: (data: loginResType) => {
        queryClient.invalidateQueries()
        setCookie('accessToken', data.data.access)
        setCookie('refreshToken', data.data.refresh)
        const contract = data.data.contractList.join(',')
        setCookie('contractType', contract)
        navigate('/main')
      },
    },
  )
  const loginPost = (e: React.FormEvent) => {
    removeCookie('accessToken')
    removeCookie('refreshToken')
    e.preventDefault()
    sendData.mutate()
  }
  useEffect(() => {
    queryClient.invalidateQueries()
    removeCookie('accessToken')
    removeCookie('refreshToken')
  }, [])

  return (
    <section className={styles.loginBg}>
      <div className={styles.loginWrap}>
        <form className="init" onSubmit={loginPost}>
          <div className={styles.bi}>
            <img src={`${process.env.PUBLIC_URL}/assets/img/bi_lg.svg`} />
          </div>
          <div className={styles.mt50}>
            <p>
              <input type="text" className={`${idAlert && styles.warning} ${styles.idInput}`} placeholder={t('id')} {...idInit} />
            </p>
            <p className={styles.alert}>{idAlert}</p>
          </div>
          <div className={styles.mt24}>
            <p>
              <input type="password" className={`${pwAlert && styles.warning} ${styles.pwInput}`} placeholder={t('pw')} {...pwInit} />
            </p>
            <p className={styles.alert}>{pwAlert}</p>
          </div>
          <div className={`${styles.mt36} ${styles.buttonWrap}`}>
            {idInit.value === '' || pwInit.value === '' ? (
              <span>
                <i></i>
                {t('idNpw')}
              </span>
            ) : null}

            <button className={`${styles.submit} ${disabled ? styles.disabled : styles.enable}`} disabled={disabled}>
              {t('login')}
            </button>
          </div>
        </form>
        <div className={`${styles.mt40} ${styles.findWrap}`}>
          <a href="https://www.addtune.net/findPW" target="_blank" rel="noreferrer">
            {t('findPw')}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Login
