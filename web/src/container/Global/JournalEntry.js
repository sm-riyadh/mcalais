import React, { Fragment, useState, useEffect } from 'react'

import { Modal, Text, Container } from '../../component'
import dateFormat from 'dateformat'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'
import fmt from 'indian-number-format'

const AccountSelection = ({ account }) =>
  [ 'assets', 'liabilities', 'equities', 'expenses', 'incomes' ].map(type => (
    <Fragment>
      <option value='' disabled />
      <option value='' disabled>
        {type.toUpperCase()}
      </option>
      {account[type].map(({ code, name, balance }) => (
        <option value={code}>
          &nbsp;{name} - ৳ {fmt.format(balance, 2)}
        </option>
      ))}
    </Fragment>
  ))

const JournalEntryModal = props => {
  let accountSelect

  const [ isFocused, setIsFocused ] = useState(false)

  const { date, debit, debit_note, credit, credit_note, description, amount, comment, shadowEntries } = props.input
  const inputHandler = props.inputHandler

  const newJournal = e => {
    e.preventDefault()

    props.sendJournal({
      date        : new Date(date).getTime(),
      company     : props.company,
      credit,
      credit_note,
      debit,
      debit_note,
      description,
      amount,
      comment,
    })

    const { balance, ...accounts } = props.account

    let creditName, debitName
    Object.values(accounts).map(a => {
      a.filter(e => e.code === +credit).map(e => (e.length != 0 ? (creditName = e.name) : null))
    })
    Object.values(accounts).map(a => {
      a.filter(e => e.code === +debit).map(e => (e.length != 0 ? (debitName = e.name) : null))
    })

    inputHandler({
      name  : 'shadowEntries',
      value : [
        {
          date,
          credit      : creditName,
          credit_note,
          debit       : debitName,
          debit_note,
          description,
          amount,
          comment,
          progress    : 'done',
        },
        ...shadowEntries,
      ],
    })
    // props.modalClose()
    accountSelect.focus()
    inputHandler({ name: 'credit', value: '' })
    inputHandler({ name: 'credit_note', value: '' })
    inputHandler({ name: 'debit', value: '' })
    inputHandler({ name: 'debit_note', value: '' })
    inputHandler({ name: 'description', value: '' })
    inputHandler({ name: 'amount', value: '' })
    inputHandler({ name: 'comment', value: '' })
  }

  const onChangeHandler = ({ target }) => inputHandler({ name: target.name, value: target.value })

  return (
    props.isModalOpen && (
      <Modal title='Transaction' style={{ padding: '0' }} modalClose={props.modalClose}>
        <Fragment>
          <div className='grid grid-3-1_1'>
            <Container className='main journal-entry-shadow flex-d-col' noPad>
              <p className='title'>Your Today's Entry</p>
              <table className='table-entry'>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Voucher ID</th>
                    <th>Date</th>
                    <th>To</th>
                    <th>From</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {shadowEntries.map(({ credit, debit, description, amount, comment, progress }, index) => (
                    <tr className='shadow'>
                      <td>{index}</td>
                      <td>{dateFormat(date, 'ddd, dS mmm')}</td>
                      <td>{debit}</td>
                      <td>{credit}</td>
                      <td>{description}</td>
                      <td>{amount}</td>
                      <td>{comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Container>
            <form className='aside' onSubmit={newJournal}>
              <Container className='journal-entry-form'>
                <div className='flex flex-d-col'>
                  <div>
                    <label className='label'>
                      <p>Date</p>
                    </label>

                    <SingleDatePicker
                      date={date}
                      autoFocus={true}
                      focused={isFocused}
                      onFocusChange={({ focused }) => setIsFocused(focused)}
                      onDateChange={value => onChangeHandler({ target: { name: 'date', value } })}
                      id='date'
                      initialDate={moment()}
                      displayFormat='D MMM YYYY'
                      monthFormat='MMMM YYYY'
                      numberOfMonths={1}
                      isOutsideRange={() => false}
                      daySize={30}
                      isDayHighlighted={date =>
                        date.year() === moment().year() &&
                        date.month() === moment().month() &&
                        date.date() === moment().date()}
                      isDayBlocked={date =>
                        date.year() > moment().year() ||
                        (date.year() >= moment().year() && date.month() > moment().month()) ||
                        (date.year() >= moment().year() &&
                          date.month() >= moment().month() &&
                          date.date() > moment().date())}
                      firstDayOfWeek={6}
                      required={true}
                      small
                      block
                      hideKeyboardShortcutsPanel
                    />
                  </div>
                  <div className='grid grid-2-1_1'>
                    <label className='label'>
                      <p>To</p>
                      <select
                        className='main select'
                        name='debit'
                        ref={select => {
                          accountSelect = select
                        }}
                        onChange={onChangeHandler}
                        value={debit}
                      >
                        <option value=''>Choose a catagory</option>
                        <AccountSelection account={props.account} />
                      </select>
                    </label>
                    <label className='label'>
                      <p>Memo</p>
                      <input
                        className='aside input'
                        type='text'
                        placeholder='🗒 Note'
                        name='debit_note'
                        onChange={onChangeHandler}
                        value={debit_note}
                        tabindex='-1'
                      />
                    </label>
                  </div>
                  <div className='grid grid-2-1_1'>
                    <label className='label'>
                      <p>From</p>
                      <select className='main select' name='credit' onChange={onChangeHandler} value={credit}>
                        <option value=''>Choose a catagory</option>
                        <AccountSelection account={props.account} />
                      </select>
                    </label>
                    <label className='label'>
                      <p>Memo</p>
                      <input
                        className='aside input'
                        type='text'
                        placeholder='🗒 Note'
                        name='credit_note'
                        onChange={onChangeHandler}
                        value={credit_note}
                        tabindex='-1'
                      />
                    </label>
                  </div>
                  <label className='label'>
                    <p>Description</p>
                    <input
                      className='input'
                      type='text'
                      name='description'
                      onChange={onChangeHandler}
                      value={description}
                    />
                  </label>
                  <label className='label'>
                    <p>Amount</p>
                    <input className='input' type='number' name='amount' onChange={onChangeHandler} value={amount} />
                  </label>
                  <label className='label'>
                    <p>Comment</p>
                    <textarea className='input' type='text' name='comment' onChange={onChangeHandler} value={comment} />
                    {/* <input className='input' type='text' name='comment' onChange={onChangeHandler} value={comment} /> */}
                  </label>
                </div>
                <Container className='journal-entry-form-footer'>
                  <div className='grid grid-1-2_1'>
                    <input type='submit' className='btn btn-journal-entry-custom grey' tabindex='-1' value='Clear' />
                    <input type='submit' className='btn btn-journal-entry-custom primary main' value='Done' />
                  </div>
                </Container>
              </Container>
            </form>
          </div>
        </Fragment>
      </Modal>
    )
  )
}

export default JournalEntryModal
