import React from 'react'

const sideBar = props => {
  return <div className={`sidebar${props.collapsed ? ' sidebar-collapsed' : ''}`}>{props.children}</div>
}

export default sideBar
