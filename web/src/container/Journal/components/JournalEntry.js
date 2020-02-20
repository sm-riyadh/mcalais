import React, { Fragment, useState } from 'react'

import { Modal } from '../../../component'

const CoaSelection = ({ coa }) =>
  ['assets', 'liabilities', 'equities', 'expenses', 'incomes'].map(type => (
    <Fragment>
      <option value='' disabled></option>
      <option value='' disabled>
        {type.toUpperCase()}
      </option>
      {coa[type].map(({ code, name }) => (
        <option value={code}>&nbsp;&nbsp;{name}</option>
      ))}
    </Fragment>
  ))

const JournalEntryModal = props => {
  const [debit, setDebit] = useState('')
  const [credit, setCredit] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [comment, setComment] = useState('')

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

    props.modalClose()
    setDebit('')
    setCredit('')
    setDescription('')
    setAmount('')
    setComment('')
  }
  return (
    props.isModalOpen && (
      <Modal title='Transaction' modalClose={props.modalClose}>
        <Fragment>
          <form style={{ width: '100%' }} onSubmit={newJournal}>
            <section>
              From
              <select
                name='credit'
                // ref={select => {
                //   this.accountSelect = select
                // }}
                onChange={e => setCredit(e.target.value)}
                value={credit}
              >
                <option value=''>Choose a catagory</option>
                <CoaSelection coa={props.coa} />
              </select>
            </section>
            <label>
              To
              <select
                name='debit'
                // ref={select => {
                //   this.accountSelect = select
                // }}
                onChange={e => setDebit(e.target.value)}
                value={debit}
              >
                <option value=''>Choose a catagory</option>
                <CoaSelection coa={props.coa} />
              </select>
            </label>
            <br />
            <br />
            Description:{' '}
            <input
              type='text'
              name='description'
              onChange={e => setDescription(e.target.value)}
              value={description}
            />
            <br />
            <br />
            Amount:{' '}
            <input
              type='number'
              name='amount'
              onChange={e => setAmount(e.target.value)}
              value={amount}
            />
            <br />
            <br />
            Remarks:{' '}
            <textarea
              type='text'
              name='comment'
              onChange={e => setComment(e.target.value)}
              value={comment}
            />
            <br />
            <br />
            <input type='submit' input='ADD' />
          </form>
        </Fragment>
      </Modal>
    )
  )
}

export default JournalEntryModal
