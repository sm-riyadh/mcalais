import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { fetchLedger } from '../../store/actions'

class Ledger extends Component {
  componentDidMount() {
    this.props.fetchLedger()
  }

  render() {
    const [ledger, chart_of_account] = [
      this.props.ledger,
      this.props.chart_of_account,
    ]
    return (
      <Fragment>
        <main>
          <section style={{ margin: '10px' }}>
            {ledger.map((ledger, i) => (
              <Fragment key={i}>
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
                          {new Date(+entry.time).getDay() +
                            '/' +
                            new Date(+entry.time).getMonth() +
                            '/' +
                            new Date(+entry.time).getYear()}
                        </td>
                        <td>
                          {chart_of_account.filter(
                            e => +e.code === entry.credit
                          )[0]
                            ? chart_of_account.filter(
                                e => +e.code === entry.credit
                              )[0].name
                            : 'ERROR: Account Not Found'}
                        </td>
                        <td>{entry.debit}</td>
                        <td>{entry.credit}</td>
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
          </section>
        </main>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  ledger: state.ledger,
  chart_of_account: state.chart_of_account,
})
const mapDispatchToProps = dispatch => ({
  fetchLedger: () => dispatch(fetchLedger()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Ledger)
