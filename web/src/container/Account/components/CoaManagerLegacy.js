import React, { Fragment, useState } from 'react'

import { Modal } from '../../../component'

const AccountManager = props => {
  const [ type, setType ] = useState('')
  const [ name, setName ] = useState('')

  const newAccount = e => {
    e.preventDefault()

    props.sendAccount({
      company : props.company,
      type,
      name,
    })

    props.modalClose()
    setType('')
    setName('')
  }
  return (
    props.isModalOpen && (
      <Modal title='Transaction' modalClose={props.modalClose}>
        <Fragment>
          <form style={{ width: '100%' }} onSubmit={newAccount}>
            <section>
              From
              <select name='type' onChange={e => setType(e.target.value)} value={type}>
                <option value='' disabled>
                  Choose a catagory
                </option>
                <option value='assets'>Assets</option>
                <option value='liabilities'>Liabilities</option>
                <option value='equities'>Equities</option>
                <option value='expenses'>Expenses</option>
                <option value='incomes'>Incomes</option>
              </select>
            </section>
            <br />
            <br />
            Name: <input type='text' name='description' onChange={e => setName(e.target.value)} value={name} />
            <br />
            <br />
            <input type='submit' input='ADD' />
          </form>
        </Fragment>
      </Modal>
    )
  )
}

export default AccountManager
