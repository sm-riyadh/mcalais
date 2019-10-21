import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { sendJournals } from '../../store/actions'

class Ledgers extends Component {
	state = {
		date: new Date().getTime(),
		destination: '',
		source: [ '' ],
		amount: [ '' ],

		sourceCount: 0,
	}
	HandleChange = e => {
		const state = { ...this.state }
		state[e.target.name] = e.target.value
		this.setState(state)
	}
	HandleChangeSource = e => {
		const state = { ...this.state }
		state[e.target.name][e.target.dataset.count] = e.target.value

		this.setState(state)
	}
	HandleClear = e => {
		const state = {
			date: new Date().getTime(),
			destination: '',
			source: [ '' ],
			amount: [ NaN ],
		}

		this.setState(state)
	}

	HandlerAddJournal = e => {
		e.preventDefault()
		this.props.sendJournals({
			date: this.state.date,
			destination: this.state.destination,
			source: this.state.source,
			amount: this.state.amount,
		})

		this.HandleClear()
	}

	render() {
		const [ ledgers, chart_of_accounts ] = [ this.props.ledgers, this.props.chart_of_accounts ]
		return (
			<Fragment>
				<main>
					<section style={{ margin: '10px' }}>
						{ledgers.map((ledger, i) => (
							<Fragment>
								<table border='1' style={{ width: '100%' }}>
									<caption>{ledger.name}</caption>
									<thead>
										<tr>
											<th rowSpan='2'>Date</th>
											<th rowSpan='2'>Description</th>
											<th colSpan='2'>Amount</th>
										</tr>
										<tr>
											<th>Debit</th>
											<th>Credit</th>
										</tr>
									</thead>
									<tbody>
										{ledger.transactions.map((entry, i) => (
											<tr key={i}>
												<td>
													{new Date(entry.date).getDay() +
														'/' +
														new Date(entry.date).getMonth() +
														'/' +
														new Date(entry.date).getYear()}
												</td>
												<td>
													{
														chart_of_accounts.filter(e => e.code === entry.particular)[0] ? chart_of_accounts.filter(
															e => e.code === entry.particular
														)[0].name :
														'ERROR: Account Not Found'}
												</td>
												<td>{entry.debit}</td>
												<td>{entry.credit}</td>
											</tr>
										))}
										<tr>
											<td colSpan='2'>Total</td>
											<td>{ledger.debit}</td>
											<td>{ledger.credit}</td>
										</tr>
									</tbody>
								</table>
								<br />
							</Fragment>
						))}
					</section>
				</main>
			</Fragment>
		)
	}
}

const mapStateToProps = state => ({
	ledgers: state.ledgers,
	chart_of_accounts: state.chart_of_accounts,
})
const mapDispatchToProps = dispatch => ({
	sendJournals: payload => dispatch(sendJournals(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Ledgers)
