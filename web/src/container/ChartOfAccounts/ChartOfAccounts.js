import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
// import chartOfAccounts from '../../store/reducers/chartOfAccounts'
// import { connect } from 'react-redux'
// import { Route, Switch, withRouter } from 'react-router-dom'
// import * as actions from '../store/actions'

// import { loadCOA } from '../store/actions/index'

class App extends Component {
	state = {
		account: 7,
	}
	OnChange = e => {
		const state = { ...this.state }
		state[e.target.name] = e.target.value
		this.setState(state)
	}
	Clear = e => {
		const state = { ...this.state }
		state.name = ''

		this.setState(state)
	}

	render() {
		return (
			<Fragment>
				<main>
					<section style={{ margin: '10px' }}>
						<h2>Chart of Accounts</h2>
						<table border='1' style={{ width: '100%' }}>
							<thead>
								<tr>
									<th> Code </th>
									<th> Name </th>
									<th> Debit </th>
									<th> Credit </th>
									<th> Balance </th>
								</tr>
							</thead>
							<tbody>
								{this.props.chart_of_accounts.map((data, i) => (
									<tr key={i}>
										<td>{data.code}</td>
										<td>{data.name}</td>
										<td>{data.debit}</td>
										<td>{data.credit}</td>
										<td>{data.debit - data.credit}</td>
									</tr>
								))}
							</tbody>
						</table>
					</section>
					<hr />
					<section>
						<h2> Add account </h2>
						<form style={{ width: '100%' }} onSubmit={this.HandlerAddAccount}>
							<label>
								Account:{' '}
								<select name='catagory' onChange={this.OnChange} value={this.state.catagory}>
									<option value='' disabled>
										Choose a catagory
									</option>
									<option value='current_assets'>Current Assets</option>
									<option value='fixed_assets'>Fixed Assets</option>
									<option value='current_liabilities'>Current Liabilities</option>
									<option value='longterm_liabilities'>Long-term Liabilities</option>
									<option value='equity'>Capital Equity</option>
								</select>
							</label>
							{this.state.catagory && (
								<label>
									Stack On:
									<select name='stackCatagory' onChange={this.OnChange} value={this.state.stack_catagory}>
										<option value='' disabled>
											Choose
										</option>
										<option disabled> {this.state.stackon_account} </option>
										<option disabled>----------</option>
										{this.props.chart_of_accounts.filter(e => e.code.slice(0, 1) === '1').map((data, i) => (
											<option key={i} value={data.code}>
												{data.name}
											</option>
										))}
									</select>
								</label>
							)}
							<br />
							<br />
							Code: <input type='number' name='name' onChange={this.OnChange} value={this.state.name} />
							<br />
							<br />
							Name: <input type='text' name='code' onChange={this.OnChange} value={this.state.code} />
							<br />
							<br />
							<input type='submit' value='Add Account' />
						</form>
					</section>
				</main>
			</Fragment>
		)
	}
}

const mapStateToProps = state => ({
	chart_of_accounts: state.chart_of_accounts,
	journals: state.journals,
})
// const mapDispatchToProps = dispatch => ({
// 	loadCOA: () => dispatch(loadCOA()),
// })

export default connect(mapStateToProps, null)(App)
