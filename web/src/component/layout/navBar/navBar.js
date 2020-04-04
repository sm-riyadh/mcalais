import React from 'react'
import { NavLink } from 'react-router-dom'

import { SideBar } from '../../'

const navBar = ({ title, path, icon, collapsed }) => {
  return (
    <NavLink to={path} activateClassName='activate'>
      <div className='links'>
        <i className='material-icons p-right-1'>{icon}</i>
        {!collapsed && title}
      </div>
    </NavLink>
  )
}

export default navBar
