import styles from '@style/common/top.module.scss'
import { Link } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { NavData, NavState, NavSubState, NavActive } from '@modules/recoil/NavRecoil'
import React, { useCallback, useEffect } from 'react'
import { contactListTab, contactTab } from '@modules/recoil/BoardRecoil'
import { useTranslation } from 'react-i18next'
import { modifyStatusState } from '@modules/recoil/MyProfile'
import { history } from '@components/common/History' //react-router v6 history
const TopUi = (): JSX.Element => {
  const { t } = useTranslation()
  const [active, setActive] = useRecoilState(NavActive)
  const [navState, setNavState] = useRecoilState(NavState)
  const [navSubState, setNavSubState] = useRecoilState(NavSubState)
  const [navData, setNavDate] = useRecoilState(NavData)
  const seTab = useSetRecoilState(contactTab)
  const setContact = useSetRecoilState(contactListTab)
  const setModifyStatus = useSetRecoilState(modifyStatusState) // 수정상태
  useEffect(() => {
    const unlistenHistoryEvent = history.listen(({ action }) => {
      if (action === 'POP') {
        listenBackEvent()
      }
    })
    const listenBackEvent = () => {
      const pathArray = window.location.pathname.split('/')
      let path = pathArray[pathArray.length - 1]
      switch (path) {
        case '':
          setNavState(0)
          break
        case 'main':
          setNavState(0)
          break
        case 'profile':
          setNavState(1)
          setNavSubState(1)
          break
        case 'myContract':
          setNavState(1)
          setNavSubState(2)
          break
        case 'calculate':
          setNavState(2)
          break
        case 'faq':
          setNavState(3)
          setNavSubState(1)
          break
        case 'contact':
          setNavState(3)
          setNavSubState(2)
          break
        case 'notice':
          setNavState(3)
          setNavSubState(3)
          break
      }
    }
    return unlistenHistoryEvent
  }, [])

  const setNav = useCallback((num: number): void => {
    setNavState(num)
  }, [])
  const setSubNav = (num: number): void => {
    setNavSubState(num)
  }
  useEffect(() => {
    if (!active) {
      setNavState(0)
      setSubNav(0)
    }
  }, [active])
  useEffect(() => {
    setNavState(0)
    setSubNav(0)
    setNavDate([
      {
        depths1: t('menu1'),
        link: '/myInfo/profile',
        children: [
          {
            depths2: t('menu1-1'),
            link: '/myInfo/profile',
          },
          {
            depths2: t('menu1-2'),
            link: '/myInfo/myContract',
          },
        ],
      },
      {
        depths1: t('menu2'),
        link: '/calculate',
      },
      // {
      //   depths1: t('menu3'),
      //   link: '/letters',
      // },
      {
        depths1: t('menu4'),
        link: '/customerSupport/faq',
        children: [
          {
            depths2: t('menu4-1'),
            link: '/customerSupport/faq',
          },
          {
            depths2: t('menu4-2'),
            link: '/customerSupport/contact',
          },
          {
            depths2: t('menu4-3'),
            link: '/customerSupport/notice',
          },
        ],
      },
    ])
  }, [])

  return (
    <nav className={styles.topNav}>
      <ul className={styles.depths1}>
        {navData.length > 0 &&
          navData.map((ele: any, index: any) => {
            return (
              <li className={navState === index + 1 ? `${styles.active}` : ''} key={ele.link}>
                <Link
                  to={ele.link}
                  onClick={() => {
                    setActive(true)
                    setNav(index + 1)
                    setSubNav(1)
                    setContact(true)
                    seTab(true)
                  }}
                >
                  {ele.depths1}
                </Link>
                {ele.children !== undefined ? (
                  <div className={navState === index + 1 ? `${styles.depths2} ${styles.active}` : `${styles.depths2}`}>
                    <div className={styles.depths2Wrap}>
                      <div className={`${styles.depths2list}`}>
                        {ele.children.map((ele2: any, index2: any) => {
                          return (
                            <span className={navState === index + 1 && navSubState === index2 + 1 ? `${styles.active}` : ''} key={ele2.link}>
                              <Link
                                to={ele2.link}
                                onClick={() => {
                                  setActive(true)
                                  setNavState(index + 1)
                                  setSubNav(index2 + 1)
                                  setModifyStatus(false)
                                  seTab(true)
                                }}
                              >
                                {ele2.depths2}
                              </Link>
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </li>
            )
          })}
      </ul>
    </nav>
  )
}

export default React.memo(TopUi)
