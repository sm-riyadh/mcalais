import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { NavBar, ActivityBar } from '../../component/layout'

import Header from '../Header/Header'
import Journal from '../Journal/Journal'
import Coa from '../Coa/Coa'
import Company from '../Company/Company'

// import container from '../../component/container/container'

export class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <main>
          <NavBar collapsed={this.props.sidebar_collapse}>
            {[
              { title: 'Journal', path: '/journal', icon: '♪' },
              { title: 'Chart of Accounts', path: '/coa', icon: '♪' },
              { title: 'Company', path: '/company', icon: '♪' },
            ]}
          </NavBar>

          <Switch>
            <Route path='/' exact component={Journal} key={this.props.company} />
            <Route path='/journal' exact component={Journal} key={this.props.company} />
            <Route path='/coa' component={Coa} key={this.props.company} />
            <Route path='/company' component={Company} key={this.props.company} />
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
  sidebar_collapse : state.main.sidebar_collapse,
  company          : state.main.company,
})
export default connect(mapStateToProps)(Home)
