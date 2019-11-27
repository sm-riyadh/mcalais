import React, { Component, Fragment } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import LayoutSideBar from '../component/sideBar/sideBar'

import Home from './Home/Home'

class App extends Component {
  render() {
    return (
      <Fragment>
        <main className='main-container'>
          <Route path='/' component={Home} />
        </main>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(null, mapDispatchToProps)(App)
