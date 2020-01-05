import React from 'react'

const sideBar = props => {
  return (
    <div className='sidebar'>
      <h2 style={{ padding: '2rem 0 0 2rem' }}>
        <b>MCALAIS</b>
      </h2>
      <hr />
      {props.children}
    </div>
  )
}

export default sideBar
