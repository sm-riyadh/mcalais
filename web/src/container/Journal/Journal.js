import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import fmt from 'indian-number-format'

import { fetchJournal, fetchAccount, addNewJournal } from '../../store/actions'

class Journal extends Component {
  componentDidMount() {
    this.props.fetchAccount()
    this.props.fetchJournal()
  }

  state = {
    sort: {
      start_date: new Date(new Date() - 24 * 60 * 60 * 1000 * 7)
        .toISOString()
        .substr(0, 10),
      end_date: new Date().toISOString().substr(0, 10),
      search: '',
      day: 'today',
    },
    credit: '',
    debit: '',
    description: '',
    amount: '',
    comment: '',
  }
  HandleChange = (e, option) => {
    const state = { ...this.state }
    const name = e.target.name
    const value = e.target.value

    if (!option) state[name] = value
    else {
      state[option][name] = value
    }

    if (name === 'start_date' || name === 'end_date')
      this.setState(state, this.onDateChange)
    else if (name === 'day' && value !== 'n') {
      switch (value) {
        case '1': {
          state.sort.start_date = new Date(new Date() - 24 * 60 * 60 * 1000 * 1)
            .toISOString()
            .substr(0, 10)
          state.sort.end_date = new Date().toISOString().substr(0, 10)

          this.setState(state, this.onDateChange)
          break
        }
        case '2': {
          state.sort.start_date = new Date(new Date() - 24 * 60 * 60 * 1000 * 2)
            .toISOString()
            .substr(0, 10)
          state.sort.end_date = new Date().toISOString().substr(0, 10)

          this.setState(state, this.onDateChange)
          break
        }
        case '3':
          state.sort.start_date = new Date(new Date() - 24 * 60 * 60 * 1000 * 2)
            .toISOString()
            .substr(0, 10)
          state.sort.end_date = new Date().toISOString().substr(0, 10)

          this.setState(state, this.onDateChange)
          break
        case '7':
          state.sort.start_date = new Date(new Date() - 24 * 60 * 60 * 1000 * 7)
            .toISOString()
            .substr(0, 10)
          state.sort.end_date = new Date().toISOString().substr(0, 10)

          this.setState(state, this.onDateChange)
          break
        default:
          break
      }
    } else this.setState(state)
  }
  HandleClear = () => {
    const state = {
      date: new Date().getTime(),
      debit: '',
      credit: '',
      description: '',
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
      description: this.state.description,
      amount: this.state.amount,
      comment: this.state.comment,
    })

    this.HandleClear()
    this.accountSelect.focus()
  }
  onDateChange = () => {
    this.props.fetchJournal({
      start_date: this.state.sort.start_date,
      end_date: this.state.sort.end_date,
    })
  }

  render() {
    const [journal, account] = [this.props.journal, this.props.account]

    return (
      <Fragment>
        <section className='container-scrollable'>
          <div className='container-card'>
            <h3>Journal</h3>
            <span style={{ float: 'right' }} className='uk-form-group sort'>
              {/* <input type='text' className='uk-input' placeholder='Search' /> */}
              <select
                name='day'
                className='uk-select'
                onChange={e => this.HandleChange(e, 'sort')}
                value={this.state.sort.day}
              >
                <option value='1'>Today</option>
                <option value='2'>Yesterday</option>
                <option value='3'>Past 3 days</option>
                <option value='7'>Weekly</option>
                <option value='n'>Custom</option>
              </select>
              {this.state.sort.day === 'n' && (
                <Fragment>
                  <input
                    type='date'
                    name='start_date'
                    className='uk-input'
                    onChange={e => this.HandleChange(e, 'sort')}
                    value={this.state.sort.start_date}
                  />
                  <input
                    type='date'
                    name='end_date'
                    className='uk-input'
                    onChange={e => this.HandleChange(e, 'sort')}
                    value={this.state.sort.end_date}
                  />
                </Fragment>
              )}
            </span>
            <br />
            <br />
            {account.length !== 0 && journal.length !== 0 ? (
              <table
                className='uk-table uk-table-divider uk-table-striped uk-table-hover uk-table-small uk-table-justify  uk-table-middle'
                style={{ width: '100%' }}
              >
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Destination (Sources)</th>
                    <th style={{ textAlign: 'right' }}>Amount</th>
                    <th>Comments</th>
                  </tr>
                </thead>

                <tbody>
                  {journal.map(
                    (
                      { date, description, amount, credit, debit, comment },
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
                          {account.find(e => +e.code === debit).name}
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&#x2B11;&nbsp;&nbsp;(
                          {account.find(e => e.code === credit).name})
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '2rem' }}>৳</span>{' '}
                          {fmt.format(amount, 2)}
                        </td>
                        <td>{comment}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
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
                  {account.map(({ name, code, type }, i) => (
                    <option key={i} value={code}>
                      {name} [{type}]
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
                  {account.map(({ code, name, type }, i) => (
                    <option key={i} value={code}>
                      {name} [{type}]
                    </option>
                  ))}
                </select>
              </label>
              <br />
              <br />
              Description:{' '}
              <input
                type='text'
                name='description'
                className='uk-input'
                onChange={this.HandleChange}
                value={this.state.description}
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
