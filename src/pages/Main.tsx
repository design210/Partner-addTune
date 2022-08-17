import React, { Suspense } from 'react'
import Dashboard from '@components/main/Dashboard'
import ErrorBoundary from '@components/common/ErrorBoundary'
import DashboardSkeleton from '../skeletons/Dashboard'
const Main = (): JSX.Element => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <ErrorBoundary>
        <Dashboard />
      </ErrorBoundary>
    </Suspense>
  )
}

export default Main
