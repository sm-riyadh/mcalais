import React, { Component, Fragment } from 'react'
import { Header, SideBar } from '../../component/layout'

export class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        {/* <SideBar position='left'></SideBar> */}
        {/* <SideBar position='right'></SideBar> */}
      </Fragment>
    )
  }
}

export default Home
