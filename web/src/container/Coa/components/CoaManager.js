import React, { Fragment, useState } from 'react'

import { Modal } from '../../../component'

const CoaManager = props => {
  const accountSubmit = e => {
    e.preventDefault()

    props.addAccount({
      company: props.company,
      type: props.type,
      name: props.name,
    })

    props.setType('')
    props.setName('')
    props.modalClose()
  }
  return (
    props.isModalOpen && (
      <Modal title='Transaction' modalClose={props.modalClose}>
        <Fragment>
          <form style={{ width: '100%' }} onSubmit={accountSubmit}>
            <section>
              From
              <select
                name='type'
                onChange={e => props.setType(e.target.value)}
                value={props.type}
              >
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
            Name:{' '}
            <input
              type='text'
              name='description'
              onChange={e => props.setName(e.target.value)}
              value={props.name}
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

export default CoaManager
