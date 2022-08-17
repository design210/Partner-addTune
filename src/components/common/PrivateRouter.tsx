import React from 'react'
import { Navigate } from 'react-router-dom'
import { getCookie } from '@utils/cookie'
import Top from '@components/common/top/Top'
import Footer from '@components/common/Footer'

const PrivateRouter = ({ children }: { children: JSX.Element }): JSX.Element => {
  const auth = getCookie('accessToken')
  if (!auth) {
    return <Navigate to="/" replace />
  }
  return (
    <>
      <Top />
      {children}
      <Footer />
    </>
  )
}

export default PrivateRouter
