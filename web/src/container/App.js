import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './Home/Home'
import Api from './Api/Api'

class App extends Component {
  render() {
    return (
      <div className='web-app'>
        <Route path='/api' component={Api} />
        <Route path='/' component={Home} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(null, mapDispatchToProps)(App)
