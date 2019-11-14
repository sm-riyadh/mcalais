import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchJournal, addNewJournal } from '../../store/actions'

class Journal extends Component {
	componentDidMount() {
		this.props.fetchJournal()
	}

	state = {
		date: new Date().getTime(),
		destination: '',
		source: '',
		amount: '',

		sourceCount: 0,
	}
	HandleChange = e => {
		const state = { ...this.state }
		state[e.target.name] = e.target.value
		this.setState(state)
	}
	HandleClear = e => {
		const state = {
			date: new Date().getTime(),
			destination: '',
			source: '',
			amount: '',
		}

		this.setState(state)
	}

	HandlerAddJournal = e => {
		e.preventDefault()

		this.props.addNewJournal({
			date: this.state.date,
			destination: this.state.destination,
			source: this.state.source,
			amount: this.state.amount,
		})

		this.HandleClear()
	}

	render() {
		const [ journal, chart_of_account ] = [ this.props.journal, this.props.chart_of_account ]

		return (
			<Fragment>
				<main>
					<section style={{ margin: '10px' }}>
						<h2>Journal</h2>
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
								{journal.map((data, i) => (
									<tr key={i}>
										<td>
											{new Date(data.date).getDay() +
												'/' +
												new Date(data.date).getMonth() +
												'/' +
												new Date(data.date).getYear()}
										</td>
										<td>{chart_of_account.filter(e => e.code === data.destination)[0].name}</td>
										<td>{chart_of_account.filter(e => e.code === data.source)[0].name}</td>
										<td>${data.amount}</td>
									</tr>
								))}
							</tbody>
						</table>
					</section>
					<hr />
					<section>
						<h2> Custom Transaction </h2>
						<form style={{ width: '100%' }} onSubmit={this.HandlerAddJournal}>
							<label>
								Source:{' '}
								<select name='source' onChange={this.HandleChange} value={this.state.source}>
									<option value=''>Choose a catagory</option>
									{chart_of_account.map((data, i) => (
										<option key={i} value={data.code}>
											{data.name}
										</option>
									))}
								</select>
							</label>
							<br />
							<br />
							<label>
								Destination:{' '}
								<select name='destination' onChange={this.HandleChange} value={this.state.destination}>
									<option value=''>Choose a catagory</option>
									{chart_of_account.map((data, i) => (
										<option key={i} value={data.code}>
											{data.name}
										</option>
									))}
								</select>
							</label>
							<br />
							<br />
							Amount: <input type='number' name='amount' onChange={this.HandleChange} value={this.state.amount} />
							<br />
							<br />
							<input type='submit' value=' ADD ' />
						</form>
					</section>
				</main>
			</Fragment>
		)
	}
}

const mapStateToProps = state => ({
	journal: state.journal,
	chart_of_account: state.chart_of_account,
})
const mapDispatchToProps = dispatch => ({
	fetchJournal: payload => dispatch(fetchJournal(payload)),
	addNewJournal: payload => dispatch(addNewJournal(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Journal)
