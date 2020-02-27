import React, { Fragment, useState, useEffect } from 'react'

import { Modal, Text } from '../../../component'
import fmt from 'indian-number-format'

const CoaSelection = ({ coa }) =>
  ['assets', 'liabilities', 'equities', 'expenses', 'incomes'].map(type => (
    <Fragment>
      <option value='' disabled></option>
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
  // let isFirst = true
  // useEffect(() => {
  //   if (accountSelect && isFirst) {
  //     accountSelect.focus()
  //     isFirst = false
  //   }
  // })

  const [debit, setDebit] = useState('')
  const [credit, setCredit] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [comment, setComment] = useState('')
  const [shadowEntries, setShadowEntries] = useState([])

  const newJournal = e => {
    e.preventDefault()

    props.sendJournal({
      company: props.company,
      credit,
      debit,
      description,
      amount,
      comment,
    })

    const { balance, ...accounts } = props.coa

    let creditName, debitName
    Object.values(accounts).map(a => {
      console.log(a)
      a.filter(e => e.code === +credit).map(e =>
        e.length != 0 ? (creditName = e.name) : null
      )
    })
    Object.values(accounts).map(a => {
      a.filter(e => e.code === +debit).map(e =>
        e.length != 0 ? (debitName = e.name) : null
      )
    })

    setShadowEntries([
      {
        credit: creditName,
        debit: debitName,
        description,
        amount,
        comment,
        progress: 'done',
      },
      ...shadowEntries,
    ])
    // props.modalClose()
    accountSelect.focus()
    setDebit('')
    setCredit('')
    setDescription('')
    setAmount('')
    setComment('')
  }
  return (
    props.isModalOpen && (
      <Modal
        title='Transaction'
        style={{ padding: '0' }}
        modalClose={props.modalClose}
      >
        <Fragment>
          <form style={{ width: '100%' }} onSubmit={newJournal}>
            <table className='table-entry'>
              <thead>
                <tr>
                  <th>To</th>
                  <th>From</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Remarks</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <select
                      name='debit'
                      // inputRef={accountSelect}
                      ref={select => {
                        accountSelect = select
                      }}
                      onChange={e => setDebit(e.target.value)}
                      value={debit}
                    >
                      <option value=''>Choose a catagory</option>
                      <CoaSelection coa={props.coa} />
                    </select>
                  </td>
                  <td>
                    <select
                      name='credit'
                      onChange={e => setCredit(e.target.value)}
                      value={credit}
                    >
                      <option value=''>Choose a catagory</option>
                      <CoaSelection coa={props.coa} />
                    </select>
                  </td>
                  <td>
                    <input
                      type='text'
                      name='description'
                      onChange={e => setDescription(e.target.value)}
                      value={description}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      name='amount'
                      onChange={e => setAmount(e.target.value)}
                      value={amount}
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      name='comment'
                      onChange={e => setComment(e.target.value)}
                      value={comment}
                    />
                  </td>
                  <td>
                    <input type='submit' input='ADD' />
                  </td>
                </tr>
                {shadowEntries.map(
                  ({
                    credit,
                    debit,
                    description,
                    amount,
                    comment,
                    progress,
                  }) => (
                    <tr className='shadow'>
                      <td>{credit}</td>
                      <td>{debit}</td>
                      <td>{description}</td>
                      <td>{amount}</td>
                      <td>{comment}</td>
                      <td>{progress}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </form>
        </Fragment>
      </Modal>
    )
  )
}

export default JournalEntryModal
