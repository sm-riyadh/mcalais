import React, { Component, Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Container } from '../../component/common'
import { Header, NavBar, ActivityBar } from '../../component/layout'
import Journal from '../Journal/Journal'

// import container from '../../component/common/container/container'

export class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <main>
          <NavBar>
            {[
              { title: 'Overview', path: '/', icon: 'O' },
              { title: 'Journal', path: '/journal', icon: 'O' },
              { title: 'Ledgers', path: '/ledger', icon: 'O' },
              { title: 'Chart of Accounts', path: '/coa', icon: 'O' },
            ]}
          </NavBar>

          <Switch>
            <Route path='/' exact component={Journal} />
            <Route path='/journal' exact component={Journal} />
            <Route path='/ledger'>
              <Container className='p-6'>
                <h2>Coming Soon...</h2>
              </Container>
            </Route>
            {/* <Route path='/account' component={Account} /> */}
            {/* <Route path='/catalogue' component={Catalogue} /> */}
          </Switch>
          <ActivityBar />
        </main>
        {/* <SideBar position='right'></SideBar> */}
      </Fragment>
    )
  }
}

export default Home
