import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'

import { fetchJournal, fetchAccount, addNewJournal } from '../../store/actions'

class Journal extends Component {
  componentDidMount() {
    this.props.fetchAccount()
    this.props.fetchJournal()
  }

  state = {
    credit: '',
    debit: '',
    particular: '',
    amount: '',
    comment: '',
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
      particular: '',
      amount: '',
      comment: '',
    }

    this.setState(state)
  }

  HandlerAddJournal = e => {
    e.preventDefault()

    this.props.addNewJournal({
      debit: this.state.debit,
      credit: this.state.credit,
      particular: this.state.particular,
      amount: this.state.amount,
      comment: this.state.comment,
    })

    this.HandleClear()
    this.accountSelect.focus()
  }

  render() {
    const [journal, account] = [this.props.journal, this.props.account]

    return (
      <Fragment>
        <section className='container-scrollable'>
          <div className='container-card'>
            <h2>Journal</h2>
            <table
              className='uk-table uk-table-divider uk-table-striped uk-table-hover uk-table-small uk-table-justify  uk-table-middle'
              style={{ width: '100%' }}
            >
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Particular</th>
                  <th>Destination (Sources)</th>
                  <th>Amount</th>
                  <th>Comments</th>
                </tr>
              </thead>

              <tbody>
                {account.length !== 0 && journal.length !== 0
                  ? journal.map(
                      (
                        { date, particular, amount, credit, debit, comment },
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
                          <td>{particular}</td>
                          <td>
                            {account.filter(e => +e.code === debit)[0].name}
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&#x2B11;&nbsp;&nbsp;(
                            {account.filter(e => e.code === credit)[0].name})
                          </td>
                          <td>${amount}</td>
                          <td>{comment}</td>
                        </tr>
                      )
                    )
                  : null}
              </tbody>
            </table>
          </div>
        </section>
        <section
          className='uk-container sidebar'
          style={{ paddingTop: '3rem' }}
        >
          <h2> Transaction </h2>
          <hr />
          <div>
            <form style={{ width: '100%' }} onSubmit={this.HandlerAddJournal}>
              <section>
                From
                <select
                  name='credit'
                  ref={select => {
                    this.accountSelect = select
                  }}
                  className='uk-select'
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
              </section>
              <label>
                To
                <select
                  name='debit'
                  className='uk-select'
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
              Particular:{' '}
              <input
                type='text'
                name='particular'
                className='uk-input'
                onChange={this.HandleChange}
                value={this.state.particular}
              />
              <br />
              <br />
              Amount:{' '}
              <input
                type='number'
                name='amount'
                className='uk-input'
                onChange={this.HandleChange}
                value={this.state.amount}
              />
              <br />
              <br />
              Remarks:{' '}
              <textarea
                type='text'
                name='comment'
                className='uk-input'
                onChange={this.HandleChange}
                value={this.state.comment}
              />
              <br />
              <br />
              <input
                className='uk-button uk-button-primary'
                type='submit'
                input='ADD'
              />
            </form>
          </div>
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
