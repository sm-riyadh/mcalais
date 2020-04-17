import React, { Fragment, useState, useEffect } from 'react'

import { Modal } from '../../../component'

const CompanySettingsModal = props => {
  const [ name, setName ] = useState('')

  useEffect(
    () => {
      setName(props.selectedCompany.name)
    },
    [ props.selectedCompany ]
  )

  const modifyCompany = e => {
    e.preventDefault()

    props.modifyCompany({ id: props.selectedCompany.id, name })

    props.modalClose()
    setName('')
  }

  return props.isModalOpen ? (
    <Modal title='Transaction' modalClose={props.modalClose}>
      <Fragment>
        <b>ID: {props.selectedCompany.id}</b>
        <br />
        <br />
        <form style={{ width: '100%' }} onSubmit={modifyCompany}>
          Name:
          <input
            type='text'
            name='name'
            onChange={e => setName(e.target.value)}
            value={name}
            disabled={props.selectedCompany.isDisabled}
          />
          <br />
          <br />
          <input type='submit' input='Confirm Change' />
        </form>
        <div>
          {props.selectedCompany.isDisabled ? (
            <button
              className='btn'
              onClick={() => {
                props.modalClose()
                props.activateCompany()
              }}
            >
              <i className='material-icons'>add</i> Activate
            </button>
          ) : (
            <button
              className='btn'
              onClick={() => {
                props.modalClose()
                props.deactivateCompany()
              }}
            >
              <i className='material-icons'>remove</i> Deactivate
            </button>
          )}
          <button
            className='btn'
            onClick={() => {
              props.modalClose()
              props.removeCompany()
            }}
          >
            <i className='material-icons'>delete</i> Remove
          </button>
        </div>
      </Fragment>
    </Modal>
  ) : null
}

export default CompanySettingsModal
