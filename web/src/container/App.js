import React, { Component, Fragment } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import ChartOfAccount from './ChartOfAccount/ChartOfAccount'
import Ledger from './Ledger/Ledger'
import Journal from './Journal/Journal'
import { fetchJournal, fetchCoa, fetchLedger } from '../store/actions'

class App extends Component {
	componentDidMount() {
		this.props.fetchLedger()
		this.props.fetchJournal()
		this.props.fetchCoa()
	}
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
								<NavLink to='/transaction'>Transactions</NavLink>
							</li>
							<li>
								<ul>
									<li>
										<NavLink to='/transaction/purchase'>Purchase</NavLink>
									</li>
									<li>
										<NavLink to='/transaction/expenses'>Expenses</NavLink>
									</li>
									<li>
										<NavLink to='/transaction/income'>Income</NavLink>
									</li>
								</ul>
							</li>
							<li>
								<NavLink to='/gl'>General Ledger (GL)</NavLink>
							</li>
							<li>
								<NavLink to='/coa'>Chart of Accounts (COA)</NavLink>
							</li>
						</ul>
					</nav>
					<hr style={{ margin: '10px' }} />
					<Switch>
						<Route path='/transaction' component={Journal} />
						<Route path='/coa' component={ChartOfAccount} />
						<Route path='/gl' component={Ledger} />
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
