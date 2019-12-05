import React, { Component, Fragment } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import LayoutSideBar from '../../component/sideBar/sideBar'

import Account from '../Account/Account'
import Ledger from '../Ledger/Ledger'
import Journal from '../Journal/Journal'
import { fetchJournal, fetchAccount, fetchLedger } from '../../store/actions'

class App extends Component {
  componentDidMount() {
    this.props.fetchLedger()
    this.props.fetchJournal()
    this.props.fetchAccount()
  }
  render() {
    return (
      <Fragment>
        <main className='grid'>
          <LayoutSideBar>
            <ul className='sidebar__nav'>
              <li>
                <NavLink to='/'>Dashboard</NavLink>
              </li>
              <li>
                <NavLink to='/transaction'>Journal</NavLink>
              </li>
              <li>
                <NavLink to='/inventory'>Inventory</NavLink>
              </li>
              <li>
                <NavLink to='/general-ledger'>General Ledgers</NavLink>
              </li>
              <li>
                <NavLink to='/account'>Chart of Accounts</NavLink>
              </li>
            </ul>
          </LayoutSideBar>
          <section className='container-scrollable'>
            <Switch>
              <Route path='/transaction' component={Journal} />
              <Route path='/account' component={Account} />
              <Route path='/general-ledger' component={Ledger} />
              <Route exact path='/'>
                <Fragment>
                  <Account />
                  <hr />
                  <Journal />
                  <hr />
                  <hr />
                </Fragment>
              </Route>
            </Switch>
          </section>
        </main>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchJournal: () => dispatch(fetchJournal()),
  fetchAccount: () => dispatch(fetchAccount()),
  fetchLedger: () => dispatch(fetchLedger()),
})

export default connect(null, mapDispatchToProps)(App)
