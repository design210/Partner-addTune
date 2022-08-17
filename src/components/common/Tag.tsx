import React from 'react'
const Tag = ({ name, type }: { name: string; type: string }): JSX.Element => {
  return (
    <>
      <span className={`tag mr4 ${type}`}>{name}</span>
    </>
  )
}

export default Tag
