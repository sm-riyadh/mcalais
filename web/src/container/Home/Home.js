import React, { Component, Fragment } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import LayoutSideBar from '../../component/sideBar/sideBar'

import ChartOfAccount from '../ChartOfAccount/ChartOfAccount'
import Ledger from '../Ledger/Ledger'
import Journal from '../Journal/Journal'
import { fetchJournal, fetchCoa, fetchLedger } from '../../store/actions'

class App extends Component {
  componentDidMount() {
    this.props.fetchLedger()
    this.props.fetchJournal()
    this.props.fetchCoa()
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
                <NavLink to='/coa'>Chart of Accounts</NavLink>
              </li>
            </ul>
          </LayoutSideBar>
          <section className='container-scrollable'>
            <Switch>
              <Route path='/transaction' component={Journal} />
              <Route path='/coa' component={ChartOfAccount} />
              <Route path='/general-ledger' component={Ledger} />
              <Route exact path='/'>
                <Fragment>
                  <ChartOfAccount />
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
  fetchCoa: () => dispatch(fetchCoa()),
  fetchLedger: () => dispatch(fetchLedger()),
})

export default connect(null, mapDispatchToProps)(App)
