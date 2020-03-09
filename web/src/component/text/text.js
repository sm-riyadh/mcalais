import React from 'react'

const text = props => {
  return <span className={`text ${props.className}`}>{props.children}</span>
}

export default text
