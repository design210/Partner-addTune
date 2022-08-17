import React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import { RecoilRoot } from 'recoil'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import ScrollTop from '@components/common/ScrollTop'
import './utils/i18n'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 0,
      cacheTime: 10 * 60 * 1000,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
  },
})
const rootNode = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(rootNode).render(
  <RecoilRoot>
    <BrowserRouter>
      <ScrollTop />
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <App />
          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </React.StrictMode>
    </BrowserRouter>
  </RecoilRoot>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
