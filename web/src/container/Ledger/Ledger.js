import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import fmt from 'indian-number-format'

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

    this.setState(state, this.onDateChange)
  }
  onDateChange = () => {
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
            {this.props.account.length !== 0 && ledger.length !== 0 ? (
              ledger.map(({ name, transaction }, i) => (
                <Fragment key={i}>
                  <h1>{name}</h1>
                  <table
                    className='uk-table uk-table-divider uk-table-striped uk-table-hover uk-table-small uk-table-justify  uk-table-middle'
                    style={{ width: '100%' }}
                  >
                    <thead>
                      <tr>
                        <th rowSpan='2'>Date</th>
                        <th rowSpan='2'>Description</th>
                        <th rowSpan='2'>Account</th>
                        <th colSpan='2'>Amount</th>
                      </tr>
                      <tr>
                        <th style={{ textAlign: 'right' }}>Debit</th>
                        <th style={{ textAlign: 'right' }}>Credit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transaction.map(
                        (
                          { _id, date, description, account, credit, debit },
                          i
                        ) => (
                          <tr key={i}>
                            <td>
                              <span
                                title={dateFormat(
                                  date,
                                  'ddd, dS mmm, yyyy, h:MM:ss TT'
                                )}
                              >
                                {dateFormat(date, 'ddd, dS mmm, yyyy')}
                              </span>
                            </td>
                            <td>{description}</td>
                            <td>
                              {
                                this.props.account.find(
                                  e => +e.code === account
                                ).name
                              }
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <span style={{ fontSize: '2rem' }}>৳</span>{' '}
                              {fmt.format(debit, 2)}
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <span style={{ fontSize: '2rem' }}>৳</span>{' '}
                              {fmt.format(credit, 2)}
                            </td>
                          </tr>
                        )
                      )}
                      <tr>
                        <td colSpan='2'>Total</td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                </Fragment>
              ))
            ) : (
              <div
                style={{
                  width: '100%',
                  padding: '5rem',
                }}
              >
                <h1 style={{ textAlign: 'center ' }}>Loading...</h1>
              </div>
            )}
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
