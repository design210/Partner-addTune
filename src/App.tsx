import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Main from '@pages/Main'
import Profile from '@pages/myInfo/Profile'
import MyContract from '@pages/myInfo/MyContract'
import Calculate from '@pages/calculate/Calculate'
import Login from '@pages/member/Login'
import ModalTemplate from '@components/modal/ModalTemplate'
import PrivateRouter from '@components/common/PrivateRouter'
import NotFound from '@components/common/NotFound'
import Suggestion from '@pages/suggestion/Suggestion'
import Faq from '@pages/customerSupport/Faq'
import Contact from '@pages/customerSupport/Contact'
import Notice from '@pages/customerSupport/Notice'
import LoadingFixed from '@components/common/LoadingFixed'
import { loadingFixed } from '@modules/recoil/Common'
import { useRecoilValue } from 'recoil'
import ErrorPage from '@components/common/ErrorPage'
import NoticeDetail from '@pages/customerSupport/NoticeDetail'

function App(): JSX.Element {
  const loading = useRecoilValue(loadingFixed)
  const location = useLocation()
  return (
    <div>
      {loading ? <LoadingFixed /> : null}
      <Routes location={location}>
        <Route path="/" element={<Login />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route
          path="/main"
          element={
            <PrivateRouter>
              <Main />
            </PrivateRouter>
          }
        />
        <Route
          path="/myInfo/profile"
          element={
            <PrivateRouter>
              <Profile />
            </PrivateRouter>
          }
        />
        <Route
          path="/myInfo/myContract"
          element={
            <PrivateRouter>
              <MyContract />
            </PrivateRouter>
          }
        />
        <Route
          path="/calculate"
          element={
            <PrivateRouter>
              <Calculate />
            </PrivateRouter>
          }
        />
        <Route
          path="/letters"
          element={
            <PrivateRouter>
              <Suggestion />
            </PrivateRouter>
          }
        />
        <Route
          path="/customerSupport/faq"
          element={
            <PrivateRouter>
              <Faq />
            </PrivateRouter>
          }
        />
        <Route
          path="/customerSupport/contact"
          element={
            <PrivateRouter>
              <Contact />
            </PrivateRouter>
          }
        />
        <Route
          path="/customerSupport/notice"
          element={
            <PrivateRouter>
              <Notice />
            </PrivateRouter>
          }
        />
        <Route
          path="/customerSupport/noticeDetail/:id"
          element={
            <PrivateRouter>
              <NoticeDetail />
            </PrivateRouter>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <ModalTemplate />
    </div>
  )
}

export default App
