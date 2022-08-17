import React from 'react'
import '@style/index.scss'
interface propsType {
  name: string
  onclick: () => void
  className: string
}
const Button = ({ name, onclick, className }: propsType): JSX.Element => {
  return (
    <>
      <button onClick={onclick} className={className}>
        {name}
      </button>
    </>
  )
}

export default React.memo(Button)
