import React from 'react'

const text = props => {
  return (
    <span className={`${props.className ? props.className + ' ' : ''}${props.subTitle ? 'sub-title ' : ''}text`}>
      {props.children}
    </span>
  )
}

export default text
