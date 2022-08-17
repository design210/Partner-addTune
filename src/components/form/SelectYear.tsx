import React, { useState, useEffect } from 'react'
import styles from '@style/calculate/calculate.module.scss'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useRecoilState } from 'recoil'
import { yearState } from '@modules/recoil/Calculate'
import dayjs from 'dayjs'
const SelectYear = (): JSX.Element => {
  const NewIcon = (props: any) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5303 16.2722C12.2374 16.5759 11.7626 16.5759 11.4697 16.2722L6.21967 10.8277C5.92678 10.524 5.92678 10.0315 6.21967 9.72781C6.51256 9.42406 6.98744 9.42406 7.28033 9.72781L12 14.6223L16.7197 9.72781C17.0126 9.42406 17.4874 9.42406 17.7803 9.72781C18.0732 10.0315 18.0732 10.524 17.7803 10.8277L12.5303 16.2722Z"
        fill="#26282B"
      />
      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#74787D" />
    </svg>
  )
  const [year, setYear] = useRecoilState(yearState)
  const [code, setCode] = useState<Array<string>>([])
  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value as string)
  }
  useEffect(() => {
    let years = []
    const baseYear = '2021'
    const year = dayjs().format('YYYY')
    for (let i = parseInt(year); i > parseInt(baseYear) - 1; i--) {
      years.push(i.toString())
    }
    setCode(years)
    setYear(year)
  }, [])
  return (
    <>
      {code.length > 0 ? (
        <FormControl sx={{ minWidth: 105, margin: 0 }}>
          <Select value={year} onChange={handleChange} sx={{ fontSize: 24, fontWeight: 700, color: '#1B1D1F' }} className={styles.selectYear} IconComponent={NewIcon}>
            {code &&
              code.map(ele => (
                <MenuItem value={ele} style={{ fontSize: 16, fontWeight: 400, color: '#1B1D1F' }} key={ele}>
                  {`${ele}년`}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      ) : (
        <></>
      )}
    </>
  )
}

export default React.memo(SelectYear)
