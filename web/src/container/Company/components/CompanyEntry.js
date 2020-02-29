import React, { Fragment, useState } from 'react'

import { Modal } from '../../../component'

const CompanyEntryModal = props => {
  const [name, setName] = useState('')

  const newCompany = e => {
    e.preventDefault()

    props.sendCompany({
      name,
    })

    props.modalClose()
    setName('')
  }
  return (
    props.isModalOpen && (
      <Modal title='Transaction' modalClose={props.modalClose}>
        <Fragment>
          <form style={{ width: '100%' }} onSubmit={newCompany}>
            Name:{' '}
            <input
              type='text'
              name='name'
              onChange={e => setName(e.target.value)}
              value={name}
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

export default CompanyEntryModal
