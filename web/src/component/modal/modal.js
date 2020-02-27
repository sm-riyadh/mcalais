import React, { Fragment } from 'react'
import { Card, Container } from '../'

const modal = props => {
  return (
    <Fragment>
      <div className='modal-conatiner' noPad>
        <div className='backdrop' onClick={props.modalClose} />
        <Card className='modal' noPad>
          <div className='modal-header'>
            {props.title}
            <button className='btn' onClick={props.modalClose}>
              Close
            </button>
          </div>
          <Container className='modal-body' style={props.style}>
            {props.children}
          </Container>
          <Container className='modal-bottom-pad'></Container>
        </Card>
      </div>
    </Fragment>
  )
}

export default modal
