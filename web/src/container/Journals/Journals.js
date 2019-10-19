import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { sendJournals } from '../../store/actions'

class Journals extends Component {
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
		const [ journals, chart_of_accounts ] = [ this.props.journals, this.props.chart_of_accounts ]

		return (
			<Fragment>
				<main>
					<section style={{ margin: '10px' }}>
						<h2>Journals</h2>
						<table border='1' style={{ width: '100%' }}>
							<thead>
								<tr>
									<th>Date</th>
									<th>Destination</th>
									<th>Sources</th>
									<th>Amount</th>
								</tr>
							</thead>

							<tbody>
								{journals.map((data, i) => (
									<tr key={i}>
										<td>
											{new Date(data.date).getDay() +
												'/' +
												new Date(data.date).getMonth() +
												'/' +
												new Date(data.date).getYear()}
										</td>
										<td>{chart_of_accounts.filter(e => e.code === data.destination)[0].name}</td>
										<td>
											{data.source.map(source =>
												chart_of_accounts.filter(e => e.code === source).map(data => data.name + ', ')
											)}
										</td>
										<td>${data.amount}</td>
									</tr>
								))}
							</tbody>
						</table>
					</section>
					<hr />
					<section>
						<h2> Transaction </h2>
						<form style={{ width: '100%' }} onSubmit={this.HandlerAddJournal}>
							<label>
								Destination:{' '}
								<select name='destination' onChange={this.HandleChange} value={this.state.destination}>
									<option value='' selected>
										Choose a catagory
									</option>
									{chart_of_accounts.map((data, i) => (
										<option key={i} value={data.code}>
											{data.name}
										</option>
									))}
								</select>
							</label>
							<br />
							<br />
							<label>
								Source:{' '}
								<select name='source' onChange={this.HandleChangeSource} data-count={0} value={this.state.source[0]}>
									<option value='' selected>
										Choose a catagory
									</option>
									{chart_of_accounts.map((data, i) => (
										<option key={i} value={data.code}>
											{data.name}
										</option>
									))}
								</select>
								Amount:{' '}
								<input
									type='number'
									name='amount'
									onChange={this.HandleChangeSource}
									data-count={0}
									value={this.state.amount[0]}
								/>
								<br />
								<br />
							</label>
							{/* FIXME: This thing is buggy */}
							{(this.state.source[0] !== '' || this.state.amount[0] !== '') &&
								[ ...Array(this.state.source.length) ].map((arr, i) => (
									<label key={i}>
										Source:{' '}
										<select
											name='source'
											onChange={this.HandleChangeSource}
											data-count={i + 1}
											value={this.state.source[i + 1]}
										>
											<option value='' selected>
												Choose a catagory
											</option>
											{chart_of_accounts.map((data, i) => (
												<option key={i} value={data.code}>
													{data.name}
												</option>
											))}
										</select>
										Amount:{' '}
										<input
											type='number'
											name='amount'
											onChange={this.HandleChangeSource}
											data-count={i + 1}
											value={this.state.amount[i + 1]}
										/>
										<br />
										<br />
									</label>
								))}
							<input type='submit' value='Add Account' />
						</form>
					</section>
				</main>
			</Fragment>
		)
	}
}

const mapStateToProps = state => ({
	journals: state.journals,
	chart_of_accounts: state.chart_of_accounts,
})
const mapDispatchToProps = dispatch => ({
	sendJournals: payload => dispatch(sendJournals(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Journals)
