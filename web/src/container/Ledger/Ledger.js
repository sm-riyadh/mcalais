import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { fetchLedger } from '../../store/actions'

class Ledger extends Component {
  componentDidMount() {
    this.props.fetchLedger()
  }

  render() {
    const [ledger, account] = [this.props.ledger, this.props.account]
    return (
      <Fragment>
        <main>
          <section style={{ margin: '10px' }}>
            {ledger.map(({ name, transaction }, i) => (
              <Fragment key={i}>
                <h1>{name}</h1>
                <table border='1' style={{ width: '100%' }}>
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
          </section>
        </main>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  ledger: state.ledger,
  account: state.account,
})
const mapDispatchToProps = dispatch => ({
  fetchLedger: () => dispatch(fetchLedger()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Ledger)
