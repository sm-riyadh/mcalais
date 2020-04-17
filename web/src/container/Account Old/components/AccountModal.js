import React, { Fragment } from 'react'

import { Modal } from '../../../component'

const AccountModal = props => {
  const accountSubmit = e => {
    e.preventDefault()

    props.addAccount({
      name: props.name,
    })

    props.setName('')
    props.modalClose()
  }
  return (
    props.isModalOpen && (
      <Modal title='New Account' modalClose={props.modalClose}>
        <Fragment>
          <form style={{ width: '100%' }} onSubmit={accountSubmit}>
            Name:{' '}
            <input
              type='text'
              name='description'
              onChange={e => props.setName(e.target.value)}
              value={props.name}
            />
            <br />
            <br />
            <input type='submit' input='ADD ACCOUNT' />
          </form>
        </Fragment>
      </Modal>
    )
  )
}

export default AccountModal
