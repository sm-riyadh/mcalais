import React from 'react'
import { NavLink } from 'react-router-dom'

import { SideBar } from '../../common'

const navBar = props => {
  return (
    <SideBar>
      <ul className='navbar'>
        {props.children.map(({ title, path, icon }, index) => (
          <NavLink key={index} to={path} activeClassName='active'>
            <li>
              <b>{icon} </b>&nbsp; {title}
            </li>
          </NavLink>
        ))}
      </ul>
    </SideBar>
  )
}

export default navBar
