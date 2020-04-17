import React, { Fragment, useState } from 'react'

import { Modal } from '../../../component'

const CompanyEntryModal = props => {
  const [ name, setName ] = useState('')

  const createCompany = e => {
    e.preventDefault()

    props.createCompany({
      name,
    })

    props.modalClose()
    setName('')
  }
  return (
    props.isModalOpen && (
      <Modal title='Transaction' modalClose={props.modalClose}>
        <Fragment>
          <form style={{ width: '100%' }} onSubmit={createCompany}>
            Name: <input type='text' name='name' onChange={e => setName(e.target.value)} value={name} />
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
