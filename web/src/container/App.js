import React, { Component, Fragment } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'

import ChartOfAccounts from './ChartOfAccounts/ChartOfAccounts'
import Ledgers from './Ledgers/Ledgers'
import Journals from './Journals/Journals'

class App extends Component {
	render() {
		return (
			<Fragment>
				<main style={{ width: '100%', display: 'flex' }}>
					<nav>
						<ul>
							<li>
								<NavLink to='/'>Home</NavLink>
							</li>
							<li>
								<NavLink to='/transaction'>Transaction</NavLink>
							</li>
							<li>
								<NavLink to='/gl'>General Ledgers (GL)</NavLink>
							</li>
							<li>
								<NavLink to='/coa'>Chart of Accounts (COA)</NavLink>
							</li>
						</ul>
					</nav>
					<hr style={{ margin: '10px' }} />
					<Switch>
						<Route path='/transaction' component={Journals} />
						<Route path='/coa' component={ChartOfAccounts} />
						<Route path='/gl' component={Ledgers} />
						<Route exact path='/'>
							<Fragment>
								<ChartOfAccounts />
								<hr />
								<Journals />
								<hr />
								<hr />
							</Fragment>
						</Route>
					</Switch>
				</main>
			</Fragment>
		)
	}
}

export default App
