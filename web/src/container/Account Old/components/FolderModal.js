import React, { Fragment } from 'react'

import { Modal } from '../../../component'

const FolderModal = props => {
  const accountSubmit = e => {
    e.preventDefault()

    props.addFolder({
      name: props.name,
    })

    props.setName('')
    props.modalClose()
  }
  return (
    props.isModalOpen && (
      <Modal title='New Folder' modalClose={props.modalClose}>
        <Fragment>
          <form style={{ width: '100%' }} onSubmit={accountSubmit}>
            Name:{' '}
            <input
              type='text'
              name='folder'
              onChange={e => props.setName(e.target.value)}
              value={props.name}
            />
            <br />
            <br />
            <input type='submit' input='ADD FOLDER' />
          </form>
        </Fragment>
      </Modal>
    )
  )
}

export default FolderModal
