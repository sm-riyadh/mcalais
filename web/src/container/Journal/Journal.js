import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchJournal, fetchAccount, addNewJournal } from '../../store/actions'

class Journal extends Component {
  componentDidMount() {
    this.props.fetchAccount()
    this.props.fetchJournal()
  }

  state = {
    credit: '',
    debit: '',
    amount: '',
  }
  HandleChange = e => {
    const state = { ...this.state }
    state[e.target.name] = e.target.value
    this.setState(state)
  }
  HandleClear = e => {
    const state = {
      date: new Date().getTime(),
      debit: '',
      credit: '',
      amount: '',
    }

    this.setState(state)
  }

  HandlerAddJournal = e => {
    e.preventDefault()

    this.props.addNewJournal({
      debit: this.state.debit,
      credit: this.state.credit,
      amount: this.state.amount,
    })

    this.HandleClear()
  }

  render() {
    const [journal, account] = [this.props.journal, this.props.account]

    return (
      <Fragment>
        <section>
          <h2> Custom Transaction </h2>
          <form style={{ width: '100%' }} onSubmit={this.HandlerAddJournal}>
            <label>
              From:{' '}
              <select
                name='credit'
                onChange={this.HandleChange}
                value={this.state.credit}
              >
                <option value=''>Choose a catagory</option>
                {account.map(({ name, code }, i) => (
                  <option key={i} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            {'   '}
            <label>
              To:{' '}
              <select
                name='debit'
                onChange={this.HandleChange}
                value={this.state.debit}
              >
                <option value=''>Choose a catagory</option>
                {account.map(({ code, name }, i) => (
                  <option key={i} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <br />
            Amount:{' '}
            <input
              type='number'
              name='amount'
              onChange={this.HandleChange}
              value={this.state.amount}
            />
            <br />
            <br />
            <input type='submit' value=' ADD ' />
          </form>
        </section>

        <section>
          <h2>Journal</h2>
          <table border='1' style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Destination (Sources)</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {account.length !== 0 && journal.length !== 0
                ? journal.map(({ _id, amount, credit, debit }, i) => (
                    <tr key={i}>
                      <td>{_id}</td>
                      <td>
                        {account.filter(e => +e.code === debit)[0].name}
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&#x2B11;&nbsp;&nbsp;(
                        {account.filter(e => e.code === credit)[0].name})
                      </td>
                      <td>${amount}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </section>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  journal: state.journal,
  account: state.account,
})
const mapDispatchToProps = dispatch => ({
  fetchAccount: () => dispatch(fetchAccount()),
  fetchJournal: payload => dispatch(fetchJournal(payload)),
  addNewJournal: payload => dispatch(addNewJournal(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Journal)
