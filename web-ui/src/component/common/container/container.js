import React from 'react'

const container = props => {
  return (
    <div className={`${props.position && `flex-pos-to-${props.position}`}`}>
      {props.children}
    </div>
  )
}

export default container
