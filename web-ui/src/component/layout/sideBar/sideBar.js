import React from 'react'

const sideBar = props => {
  return (
    <div className={`sideBar${props.position && ` sidebar-${props.position}`}`}>
      {props.children}
    </div>
  )
}

export default sideBar
