import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './Home/Home'

class App extends Component {
  render() {
    return (
      <div className='web-app'>
        <Route path='/' component={Home} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(null, mapDispatchToProps)(App)
