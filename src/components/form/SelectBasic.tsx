import React, { useState, useEffect } from 'react'
import styles from '@style/myInfo/myInfo.module.scss'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useQuery } from 'react-query'
import { responseType, SelectPropType, sysCodeArray } from '../../types/common'
import { common } from '@api/common/Common'

const SelectBasic = ({ value, change, id, width, error }: SelectPropType): JSX.Element => {
  const newIcon = (props: any) => (
    <svg {...props} width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.7071 4.20711C16.0976 3.81658 16.0976 3.18342 15.7071 2.79289C15.3166 2.40237 14.6834 2.40237 14.2929 2.79289L15.7071 4.20711ZM8 10.5L7.29289 11.2071C7.68342 11.5976 8.31658 11.5976 8.70711 11.2071L8 10.5ZM1.70711 2.79289C1.31658 2.40237 0.683418 2.40237 0.292894 2.79289C-0.0976308 3.18342 -0.0976309 3.81658 0.292894 4.20711L1.70711 2.79289ZM14.2929 2.79289L7.29289 9.79289L8.70711 11.2071L15.7071 4.20711L14.2929 2.79289ZM8.70711 9.79289L1.70711 2.79289L0.292894 4.20711L7.29289 11.2071L8.70711 9.79289Z"
        fill="#26282B"
      />
    </svg>
  )
  const [code, setCode] = useState<sysCodeArray[]>([])
  const { refetch, isLoading } = useQuery<responseType, Error>(['getCode', id], async id => await common(id), {
    suspense: false,
    enabled: true,
    onSuccess: data => {
      data.message === 'reFetch' ? refetch() : setCode(data.data)
    },
  })
  useEffect(() => {
    refetch()
  }, [value])
  return (
    <>
      {!isLoading && (
        <FormControl sx={{ m: 1, minWidth: width, margin: 0, fontSize: 50 }}>
          <Select value={value ? value : ''} onChange={change} className={error ? `${styles.error} ${styles.basicSelect}` : `${styles.basicSelect}`} sx={{ fontSize: 14 }} IconComponent={newIcon}>
            {code &&
              code.map(ele => (
                <MenuItem value={ele.sid} style={{ fontSize: 14, fontWeight: 400, color: '#1B1D1F' }} key={ele.sid}>
                  {ele.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}
    </>
  )
}

export default React.memo(SelectBasic)
