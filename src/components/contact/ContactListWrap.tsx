import React, { useState } from 'react'
import ContactList from '@components/contact/ContactList'
import ContactDetail from '@components/contact/ContactDetail'
import { useRecoilState } from 'recoil'
import { contactListTab } from '@modules/recoil/BoardRecoil'
const ContactListWrap = (): JSX.Element => {
  const [tab, setTab] = useRecoilState(contactListTab)
  const [id, setId] = useState('')

  const viewDetail = (id: string) => {
    setId(id)
    setTab(false)
  }
  const viewList = () => {
    setTab(true)
  }
  return <>{tab ? <ContactList viewDetail={viewDetail} /> : <ContactDetail viewList={viewList} id={id} />}</>
}

export default ContactListWrap
