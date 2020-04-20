import React, { Fragment, useState } from 'react'

import { Modal } from '../../../component'

const AccountCreateModal = ({ company, type, path, ...props }) => {
  const [ name, setName ] = useState('')

  const createAccount = e => {
    e.preventDefault()

    props.createAccount({
      company,
      name,
      type,
      path,
    })

    props.modalClose()
    setName('')
  }
  return (
    props.isModalOpen && (
      <Modal title='Transaction' modalClose={props.modalClose}>
        <Fragment>
          <form style={{ width: '100%' }} onSubmit={createAccount}>
            <b>Type: {type}</b>
            <br />
            <b>Path: {path}</b>
            <br />
            <br />
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

export default AccountCreateModal
