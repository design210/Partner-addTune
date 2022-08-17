import React, { useState } from 'react'
import styles from '@style/board/Board.module.scss'
import ContactWrite from '@components/contact/ContactWrite'
import ContactListWrap from '@components/contact/ContactListWrap'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { contactListTab, contactTab } from '@modules/recoil/BoardRecoil'
import { useTranslation } from 'react-i18next'

const ContactWrap = (): JSX.Element => {
  const { t } = useTranslation()
  const [tab, setTab] = useRecoilState(contactTab)
  const setContact = useSetRecoilState(contactListTab)
  return (
    <section>
      <h1 className={`${styles.title} ${styles.mb40}`}>{t('light')}</h1>
      <div className={`${styles.tab} ${styles.mb30} ${styles.flex} ${styles.justifyCenter}`}>
        <span
          className={tab ? `${styles.active}` : ''}
          onClick={() => {
            setTab(true)
            window.scrollTo(0, 0)
          }}
        >
          {t('question')}
        </span>
        <span
          className={!tab ? `${styles.active}` : ''}
          onClick={() => {
            setTab(false)
            setContact(true)
            window.scrollTo(0, 0)
          }}
        >
          {t('myQuestion')}
        </span>
      </div>
      {tab ? <ContactWrite /> : <ContactListWrap />}
    </section>
  )
}

export default ContactWrap
