import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { NavBar, ActivityBar } from '../../component/layout'

import Header from '../Header/Header'
import Journal from '../Journal/Journal'
import Coa from '../Coa/Coa'

// import container from '../../component/container/container'

export class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <main>
          <NavBar>
            {[
              { title: 'Journal', path: '/journal', icon: 'O' },
              { title: 'Chart of Accounts', path: '/coa', icon: 'O' },
            ]}
          </NavBar>

          <Switch>
            <Route
              path='/journal'
              exact
              component={Journal}
              key={this.props.site}
            />
            <Route path='/coa' component={Coa} />
            {/* <Route path='/catalogue' component={Catalogue} /> */}
          </Switch>
          <ActivityBar />
        </main>
        {/* <SideBar position='right'></SideBar> */}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  site: state.main.site,
})
export default connect(mapStateToProps)(Home)
