import React from 'react'

import Container from '../../common/container/container'

function header() {
  return (
    <div>
      <Container position='left' noClip>
        <button className='btn btn-header-black'>icon</button>
        <h3>LOGO</h3>
      </Container>
      <Container position='right'>
        <h4>B0K@Ch0D4</h4>
        <button className='btn-header-nav-black'>Profile</button>
        <button className='btn-header-nav-black'>Admin Panel</button>
        <button className='btn-header-nav-black'>Notification</button>
        <button className='btn-header-nav-black'>Settings</button>
      </Container>
    </div>
  )
}

export default header
