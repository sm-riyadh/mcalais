import React, { Component, Fragment } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import LayoutSideBar from '../../component/sideBar/sideBar'

import Account from '../Account/Account'
import Ledger from '../Ledger/Ledger'
import Journal from '../Journal/Journal'
import Catalogue from '../Catalogue/Catalogue'
import { fetchJournal, fetchAccount, fetchLedger } from '../../store/actions'

class App extends Component {
  componentDidMount() {
    if (this.props.match.path === '/') {
      this.props.fetchLedger({
        start_date: new Date(new Date() - 24 * 60 * 60 * 1000 * 7)
          .toISOString()
          .substr(0, 10),
        end_date: new Date().toISOString().substr(0, 10),
      })
      this.props.fetchJournal()
      this.props.fetchAccount()
    }
  }
  render() {
    return (
      <Fragment>
        <main className='grid'>
          <LayoutSideBar>
            <ul className='uk-nav sidebar__nav'>
              <li>
                <NavLink to='/transaction' activeClassName='active'>
                  Journal
                </NavLink>
              </li>
              <li>
                <NavLink to='/ledger' activeClassName='active'>
                  Ledgers
                </NavLink>
              </li>
              <li>
                <NavLink to='/account' activeClassName='active'>
                  Chart of Accounts
                </NavLink>
              </li>
              <li>
                <NavLink to='/catalogue' activeClassName='active'>
                  Catalogue
                </NavLink>
              </li>
            </ul>
          </LayoutSideBar>
          <section className='grid-2'>
            <Switch>
              <Route path='/transaction' component={Journal} />
              <Route path='/account' component={Account} />
              <Route path='/ledger' component={Ledger} />
              <Route path='/catalogue' component={Catalogue} />
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
