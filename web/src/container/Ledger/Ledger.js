import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { fetchLedger } from '../../store/actions'

class Ledger extends Component {
  componentDidMount() {
    this.props.fetchLedger({
      start_date: new Date(new Date() - 24 * 60 * 60 * 1000 * 7)
        .toISOString()
        .substr(0, 10),
      end_date: new Date().toISOString().substr(0, 10),
    })
  }

  state = {
    start_date: new Date(new Date() - 24 * 60 * 60 * 1000 * 7)
      .toISOString()
      .substr(0, 10),
    end_date: new Date().toISOString().substr(0, 10),
  }
  HandleDateChange = e => {
    const state = { ...this.state }
    state[e.target.name] = e.target.value
    this.setState(state)
    this.props.fetchLedger({
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    })
  }

  render() {
    const [ledger] = [this.props.ledger]
    return (
      <Fragment>
        <section className='container-scrollable'>
          <div className='container-card'>
            {ledger.map(({ name, transaction }, i) => (
              <Fragment key={i}>
                <h1>{name}</h1>
                <table
                  className='uk-table uk-table-divider uk-table-striped uk-table-hover uk-table-small uk-table-justify  uk-table-middle'
                  style={{ width: '100%' }}
                >
                  <thead>
                    <tr>
                      <th rowSpan='2'>Date</th>
                      <th rowSpan='2'>account</th>
                      <th colSpan='2'>Amount</th>
                    </tr>
                    <tr>
                      <th>Debit</th>
                      <th>Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction.map(({ _id, account, credit, debit }, i) => (
                      <tr key={i}>
                        <td>{_id}</td>
                        {/* <td>
                            {account.filter(e => +e.code === credit)[0]
                              ? account.filter(e => +e.code === credit)[0].name
                              : 'ERROR: Account Not Found'}
                          </td> */}
                        <td>{account}</td>
                        <td>{debit}</td>
                        <td>{credit}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan='2'>Total</td>
                      {/* <td>{ledger.debit}</td>
                      <td>{ledger.credit}</td> */}
                    </tr>
                  </tbody>
                </table>
                <br />
              </Fragment>
            ))}
          </div>
        </section>
        <section
          className='uk-container sidebar'
          style={{ paddingTop: '3rem' }}
        >
          <h2>Filter</h2>
          <hr />
          <label>
            From
            <input
              type='date'
              name='start_date'
              className='uk-input'
              onChange={this.HandleDateChange}
              value={this.state.start_date}
            />
          </label>
          <br />
          <br />
          <label>
            To
            <input
              type='date'
              name='end_date'
              className='uk-input'
              onChange={this.HandleDateChange}
              value={this.state.end_date}
            />
          </label>
        </section>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  ledger: state.ledger,
  account: state.account,
})
const mapDispatchToProps = dispatch => ({
  fetchLedger: payload => dispatch(fetchLedger(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Ledger)
