import React, { Fragment, useState, useEffect } from 'react'

import { Modal, Text } from '../../component'
import dateFormat from 'dateformat'
import fmt from 'indian-number-format'

const CoaSelection = ({ coa }) =>
  [ 'assets', 'liabilities', 'equities', 'expenses', 'incomes' ].map(type => (
    <Fragment>
      <option value='' disabled />
      <option value='' disabled>
        {type.toUpperCase()}
      </option>
      {coa[type].map(({ code, name, balance }) => (
        <option value={code}>
          &nbsp;{name} - ৳ {fmt.format(balance, 2)}
        </option>
      ))}
    </Fragment>
  ))

const JournalEntryModal = props => {
  let accountSelect

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

    const { balance, ...accounts } = props.coa

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
          <form style={{ width: '100%' }} onSubmit={newJournal}>
            <table className='table-entry'>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>To</th>
                  <th>From</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Comment</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type='date' name='date' onChange={onChangeHandler} value={date} />
                  </td>
                  <td>
                    <select
                      name='debit'
                      // inputRef={accountSelect}
                      ref={select => {
                        accountSelect = select
                      }}
                      onChange={onChangeHandler}
                      value={debit}
                    >
                      <option value=''>Choose a catagory</option>
                      <CoaSelection coa={props.coa} />
                    </select>
                    <input
                      type='text'
                      placeholder='🗒 Note'
                      name='debit_note'
                      onChange={onChangeHandler}
                      value={debit_note}
                    />
                  </td>
                  <td>
                    <select name='credit' onChange={onChangeHandler} value={credit}>
                      <option value=''>Choose a catagory</option>
                      <CoaSelection coa={props.coa} />
                    </select>
                    <input
                      type='text'
                      placeholder='🗒 Note'
                      name='credit_note'
                      onChange={onChangeHandler}
                      value={credit_note}
                    />
                  </td>
                  <td>
                    <input type='text' name='description' onChange={onChangeHandler} value={description} />
                  </td>
                  <td>
                    <input type='number' name='amount' onChange={onChangeHandler} value={amount} />
                  </td>
                  <td>
                    <input type='text' name='comment' onChange={onChangeHandler} value={comment} />
                  </td>
                  <td>
                    <input type='submit' input='ADD' />
                  </td>
                </tr>
                {shadowEntries.map(({ credit, debit, description, amount, comment, progress }) => (
                  <tr className='shadow'>
                    <td>{dateFormat(date, 'ddd, dS mmm')}</td>
                    <td>{debit}</td>
                    <td>{credit}</td>
                    <td>{description}</td>
                    <td>{amount}</td>
                    <td>{comment}</td>
                    <td>{progress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </Fragment>
      </Modal>
    )
  )
}

export default JournalEntryModal
