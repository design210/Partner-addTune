import React, { useState, useEffect, useCallback } from 'react'

const useInput = ({ initialState, reset }: { initialState: any; reset?: boolean }) => {
  const state = initialState === null ? '' : initialState
  const [value, setValue] = useState(state)
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {
        target: { value },
      } = e
      setValue(value)
    },
    [value],
  )
  useEffect(() => {
    setValue(state)
  }, [state])
  useEffect(() => {
    setValue(state)
  }, [reset])
  return { value, onChange }
}

export default useInput
