import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
// import { connect } from 'react-redux'
// import { Route, Switch, withRouter } from 'react-router-dom'
// import * as actions from '../store/actions'

// import { loadCOA } from '../store/actions/index'

import ChartOfAccounts from './ChartOfAccounts/ChartOfAccounts'

class App extends Component {
	state = {}

	// HandlerFormOnChange = e => {
	// 	const state = { ...this.state }
	// 	state.form[e.target.name] = e.target.value
	// 	this.setState(state)
	// }
	// HandlerFormClear = e => {
	// 	const state = { ...this.state }
	// 	state.form.catagory = ''
	// 	state.form.name = ''
	// 	state.form.quantity = ''
	// 	state.form.particular = ''
	// 	state.form.from = ''
	// 	state.form.to = ''
	// 	state.form.amount = ''

	// 	this.setState(state)
	// }
	// accountExtractor(code) {
	// 	code = +code.substr(0, 2)
	// 	switch (code) {
	// 		case 11:
	// 			return 'assets'
	// 		case 12:
	// 			return 'assets'
	// 		case 21:
	// 			return 'liabilities'
	// 		case 22:
	// 			return 'liabilities'
	// 		case 31:
	// 			return 'equity'
	// 		case 32:
	// 			return 'equity'
	// 		default:
	// 			return null
	// 	}
	// }
	// HandlerAddAccount = e => {
	// 	e.preventDefault()
	// 	const state = { ...this.state }
	// 	console.log(state.form.catagory)
	// 	const newCode = +state.form.catagory + '000'

	// 	this.props.chart_of_accounts.push({
	// 		code: newCode,
	// 		name: state.form.name,
	// 		amount: 0,
	// 	})

	// 	this.HandlerFormClear()
	// }
	// HandlerAddJournalInventory = e => {
	// 	e.preventDefault()

	// 	const state = { ...this.state }
	// 	const inventory_code = 11400

	// 	state.journal.push({
	// 		date: new Date().getTime(),
	// 		particular: this.state.form.particular,
	// 		from: +this.state.form.from,
	// 		to: inventory_code,
	// 		amount: this.state.form.amount,
	// 	})

	// 	this.props.chart_of_accounts.filter(e => e.code === +this.state.form.from)[0].amount -= +this.state.form.amount

	// 	this.props.chart_of_accounts.filter(e => e.code === inventory_code)[0].amount += +this.state.form.amount
	// 	this.props.chart_of_accounts.filter(e => e.code === inventory_code)[0].contains.push({
	// 		name: this.state.form.particular,
	// 		quantity: 0,
	// 	})

	// 	this.setState(state)
	// 	this.HandlerFormClear()
	// }
	// HandlerAddJournalTransaction = e => {
	// 	e.preventDefault()

	// 	const state = { ...this.state }

	// 	if (this.state.form.from.slice(0, 1) === this.state.form.to.slice(0, 1)) {
	// 		this.props.chart_of_accounts.filter(e => e.code === +this.state.form.from)[0].amount -= +this.state.form.amount
	// 		this.props.chart_of_accounts.filter(e => e.code === +this.state.form.to)[0].amount += +this.state.form.amount
	// 	} else {
	// 		this.props.chart_of_accounts.filter(e => e.code === +this.state.form.from)[0].amount += +this.state.form.amount
	// 		this.props.chart_of_accounts.filter(e => e.code === +this.state.form.to)[0].amount += +this.state.form.amount
	// 	}

	// 	state.journal.push({
	// 		date: new Date().getTime(),
	// 		particular: this.state.form.particular,
	// 		from: +this.state.form.from,
	// 		to: +this.state.form.to,
	// 		amount: this.state.form.amount,
	// 	})

	// 	this.setState(state)
	// 	this.HandlerFormClear()
	// }
	// HandlerAddJournalSale = e => {
	// 	e.preventDefault()

	// 	const state = { ...this.state }
	// 	const inventory_code = 11400

	// 	state.journal.push({
	// 		date: new Date().getTime(),
	// 		particular: this.state.form.particular,
	// 		from: +this.state.form.from,
	// 		to: inventory_code,
	// 		amount: this.state.form.amount,
	// 	})

	// 	this.props.chart_of_accounts.filter(e => e.code === +this.state.form.from)[0].amount += +this.state.form.amount

	// 	this.props.chart_of_accounts.filter(e => e.code === inventory_code)[0].amount -= +this.state.form.amount

	// 	this.props.chart_of_accounts.filter(
	// 		e => e.code === inventory_code
	// 	)[0].contains = this.props.chart_of_accounts
	// 		.filter(e => e.code === inventory_code)[0]
	// 		.contains.filter(e => e.name !== this.state.form.particular)

	// 	this.setState(state)
	// 	this.HandlerFormClear()
	// }
	// HandlerAddInventory = e => {
	// 	e.preventDefault()

	// 	const state = { ...this.state }

	// 	this.props.chart_of_accounts
	// 		.filter(e => e.code === 11400)[0]
	// 		.contains.push({ name: state.form.name, quantity: state.form.quantity })

	// 	this.setState(state)
	// 	this.HandlerFormClear()
	// }

	render() {
		return (
			<Fragment>
				<main style={{ width: '100%', display: 'flex' }}>
					<ChartOfAccounts />
					{/*
					<section style={{ margin: '10px' }}>
						<h2>Inventory</h2>
						<form onSubmit={this.HandlerAddInventory}>
							<br />
							Name: <input type='text' name='name' onChange={this.HandlerFormOnChange} value={this.state.form.name} />
							<br />
							<br />
							Qantity:{''}
							<input
								type='number'
								name='quantity'
								onChange={this.HandlerFormOnChange}
								value={this.state.form.qantity}
							/>
							<br />
							<br />
							<input type='submit' style={{ width: '100%' }} value='Add' />
						</form>
						<hr />
						<table border='1' style={{ width: '100%' }}>
							<thead>
								<tr>
									<th colSpan='3'>Inventory</th>
								</tr>
							</thead>
							<tbody>
								{this.props.chart_of_accounts.filter(e => e.code === 11400)[0].contains.map((value, i) => (
									<tr key={i}>
										<td>{value.name}</td>
										<td>{value.quantity}</td>
									</tr>
								))}
							</tbody>
						</table>
					</section> */}

					{/* <section>
						<h2>Journal</h2>
						<hr />
						<section>
							<h3>Transaction</h3>
							<form onSubmit={this.HandlerAddJournalTransaction}>
								Particular:{' '}
								<input
									type='text'
									name='particular'
									onChange={this.HandlerFormOnChange}
									value={this.state.form.particular}
								/>
								<br />
								<br />
								From:{' '}
								<select name='from' onChange={this.HandlerFormOnChange} value={this.state.form.from}>
									<option value='' disabled>
										Choose
									</option>
									{this.props.chart_of_accounts.map((data, i) => (
										<option key={i} value={data.code}>
											{data.name}
										</option>
									))}
								</select>
								<br />
								<br />
								<label>
									To:{' '}
									<select name='to' onChange={this.HandlerFormOnChange} value={this.state.form.to}>
										<option value='' disabled>
											Choose
										</option>
										{this.props.chart_of_accounts.map((data, i) => (
											<option key={i} value={data.code}>
												{data.name}
											</option>
										))}
										{this.props.chart_of_accounts.map((data, i) => (
											<option key={i} value={data.code}>
												{data.name}
											</option>
										))}
									</select>
								</label>
								<br />
								<br />
								Amount:{' '}
								<input type='number' name='amount' onChange={this.HandlerFormOnChange} value={this.state.form.amount} />
								<br />
								<br />
								<input type='submit' style={{ width: '100%' }} value='Add' />
							</form>
							<hr />
						</section>

						<section>
							<h3>Sale</h3>
							<form onSubmit={this.HandlerAddJournalSale}>
								Item:{' '}
								<select name='particular' onChange={this.HandlerFormOnChange} value={this.state.form.particular}>
									<option value='' disabled>
										Choose
									</option>
									{this.props.chart_of_accounts.filter(e => e.code === 11400)[0].contains.map((data, i) => (
										<option key={i} value={data.code}>
											{data.name}
										</option>
									))}
								</select>
								<br />
								<br />
								<label>
									To:{' '}
									<select name='from' onChange={this.HandlerFormOnChange} value={this.state.form.from}>
										<option value='' disabled>
											Choose
										</option>
										{this.props.chart_of_accounts.filter(e => e.checkable).map((data, i) => (
											<option key={i} value={data.code}>
												{data.name}
											</option>
										))}
									</select>
								</label>
								<br />
								<br />
								Ammount:{' '}
								<input type='number' name='amount' onChange={this.HandlerFormOnChange} value={this.state.form.amount} />
								<br />
								<br />
								<input type='submit' style={{ width: '100%' }} value='Add' />
							</form>
							<hr />
						</section>
						<section>
							<h3>Inventory</h3>
							<form onSubmit={this.HandlerAddJournalInventory}>
								<label>
									Account:{' '}
									<select name='from' onChange={this.HandlerFormOnChange} value={this.state.form.from}>
										<option value='' disabled>
											Choose
										</option>
										{this.props.chart_of_accounts.filter(e => e.checkable).map((data, i) => (
											<option key={i} value={data.code}>
												{data.name}
											</option>
										))}
									</select>
								</label>
								<br />
								<br />
								Particular:{' '}
								<input
									type='text'
									name='particular'
									onChange={this.HandlerFormOnChange}
									value={this.state.form.particular}
								/>
								<br />
								<br />
								Ammount:{' '}
								<input type='number' name='amount' onChange={this.HandlerFormOnChange} value={this.state.form.amount} />
								<br />
								<br />
								<input type='submit' style={{ width: '100%' }} value='Add' />
							</form>
							<hr />
							<table border='1' style={{ width: '100%' }}>
								<thead>
									<tr>
										<th colSpan='4'>Journal</th>
									</tr>
								</thead>
								<tbody>
									{this.state.journal.map((data, i) => (
										<tr key={i}>
											<td>
												{`${new Date(data.date).getDay()}/${new Date(data.date).getMonth()}/${new Date(
													data.date
												).getFullYear()}`}
											</td>
											<td>{data.particular}</td>
											<td>{this.props.chart_of_accounts.filter(e => e.code === data.from)[0].name}</td>
											<td>
												{this.state.currency}
												{data.amount}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</section>
					</section> */}
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
