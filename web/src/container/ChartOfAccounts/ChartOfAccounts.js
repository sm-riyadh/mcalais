import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import chartOfAccounts from '../../store/reducers/chartOfAccounts'
// import { connect } from 'react-redux'
// import { Route, Switch, withRouter } from 'react-router-dom'
// import * as actions from '../store/actions'

// import { loadCOA } from '../store/actions/index'

class App extends Component {
	state = {
		code: '',
		name: '',
		catagory: '',
		stackon_account: '',
		stack_catagory: '',
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
		const tablePrinter = (data, i) => (
			<tr>
				<td>{data.code}</td>
				<td>{data.name}</td>
				<td>{data.debit}</td>
				<td>{data.credit}</td>
				{data.stack && data.stack.map((data, i) => tablePrinter(data, i))}
			</tr>
		)

		return (
			<Fragment>
				<main style={{ width: '100%', display: 'flex' }}>
					<section style={{ margin: '10px' }}>
						<h2>Chart of Accounts</h2>
						<table border='1' style={{ width: '100%' }}>
							<tbody>
								{this.props.chart_of_accounts.map(
									(data, i) => tablePrinter(data, i)
									// <tr key={i}>
									// 	<td>{data.code}</td>
									// 	<td>{data.name}</td>
									// 	<td>{data.debit}</td>
									// 	<td>{data.credit}</td>
									// 	{data.stack && data.stack.map((data, i) => <td key={i}> {data} </td>)}
									// </tr>
								)}
							</tbody>
						</table>
					</section>
					<hr />
					<section>
						<form style={{ width: '100%' }} onSubmit={this.HandlerAddAccount}>
							<label>
								Account:{' '}
								<select name='catagory' onChange={this.OnChange} value={this.state.catagory}>
									<option value='' disabled>
										Choose
									</option>
									<option disabled> Assets </option>
									<option disabled>----------</option>
									<option value='11'>Current Assets</option>
									<option value='12'>Fixed Assets</option>

									<option disabled> Liabilities </option>
									<option disabled>----------</option>
									<option value='21'>Current Liabilities</option>
									<option value='22'>Long-term Liabilities</option>

									<option disabled> Equity </option>
									<option disabled>----------</option>
									<option value='31'>Capital Equity</option>
									<option value='32'>Income Equity</option>
								</select>
							</label>
							<br />
							<br />
							<label>
								Stack On:
								<select name='stackCatagory' onChange={this.OnChange} value={this.state.stack_catagory}>
									<option value='' disabled>
										Choose
									</option>
									<option disabled> {this.state.stackon_account} </option>
									<option disabled>----------</option>
									{this.props.chart_of_accounts
										.filter(e => e.code.slice(0, 1) === '1')
										.map((data, i) => <option value={data.code}>{data.name}</option>)}
								</select>
							</label>
							Code: <input type='number' name='name' onChange={this.OnChange} value={this.state.name} />
							Name: <input type='text' name='code' onChange={this.OnChange} value={this.state.code} />
							<br />
							<br />
							<input type='submit' value='Add' />
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
