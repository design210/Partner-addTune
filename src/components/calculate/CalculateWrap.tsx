import React, { Suspense } from 'react'
import Calendar from '@components/calculate/common/Calendar'
import YearData from '@components/calculate/year/YearData'
import MonthsData from '@components/calculate/month/MonthsData'
import { useRecoilValue } from 'recoil'
import { monthsState, yearState } from '@modules/recoil/Calculate'
import CalculateAll from '@skeletons/CalculateAll'
const CalculateWrap = (): JSX.Element => {
  const year = useRecoilValue(yearState)
  const months = useRecoilValue(monthsState)
  return (
    <>
      <Calendar />
      {months === 'all' ? (
        <Suspense fallback={<CalculateAll />}>
          <YearData year={year} />
        </Suspense>
      ) : (
        <MonthsData year={year} months={months} />
      )}
    </>
  )
}

export default CalculateWrap
