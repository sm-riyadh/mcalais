import React from 'react'
import { NavLink } from 'react-router-dom'

import { SideBar } from '../../'

const navBar = props => {
  return (
    <SideBar collapsed={props.collapsed}>
      <ul className='navbar'>
        {props.children.map(({ title, path, icon }, index) => (
          <NavLink key={index} to={path} activeClassName='active'>
            <li>
              <b className='p-right-1'>{icon}</b>
              {!props.collapsed && title}
            </li>
          </NavLink>
        ))}
      </ul>
    </SideBar>
  )
}

export default navBar
