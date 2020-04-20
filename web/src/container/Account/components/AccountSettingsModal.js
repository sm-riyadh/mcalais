import React, { Fragment, useState, useEffect } from 'react'

import { Modal } from '../../../component'

const AccountSettingsModal = props => {
  const [ name, setName ] = useState('')

  useEffect(
    () => {
      setName(props.selectedAccount.name)
    },
    [ props.selectedAccount ]
  )

  const modifyAccount = e => {
    e.preventDefault()

    props.modifyAccount({ id: props.selectedAccount.id, name })

    props.modalClose()
    setName('')
  }

  return props.isModalOpen ? (
    <Modal title='Transaction' modalClose={props.modalClose}>
      <Fragment>
        <b>ID: {props.selectedAccount.id}</b>
        <br />
        <br />
        <form style={{ width: '100%' }} onSubmit={modifyAccount}>
          Name:
          <input
            type='text'
            name='name'
            onChange={e => setName(e.target.value)}
            value={name}
            disabled={props.selectedAccount.isDisabled}
          />
          <br />
          <br />
          <input type='submit' input='Confirm Change' />
        </form>
        <div>
          {props.selectedAccount.isDisabled ? (
            <button
              className='btn'
              onClick={() => {
                props.modalClose()
                props.activateAccount()
              }}
            >
              <i className='material-icons'>add</i> Activate
            </button>
          ) : (
            <button
              className='btn'
              onClick={() => {
                props.modalClose()
                props.deactivateAccount()
              }}
            >
              <i className='material-icons'>remove</i> Deactivate
            </button>
          )}
          <button
            className='btn'
            onClick={() => {
              props.modalClose()
              props.removeAccount()
            }}
          >
            <i className='material-icons'>delete</i> Remove
          </button>
        </div>
      </Fragment>
    </Modal>
  ) : null
}

export default AccountSettingsModal
