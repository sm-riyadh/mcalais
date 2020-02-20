import React, { Fragment } from 'react'
import dateFormat from 'dateformat'
import fmt from 'indian-number-format'

import { Modal } from '../../../component'

const JournalDetailModal = props =>
  props.isModalOpen && (
    <Modal title='Journal' modalClose={props.modalClose}>
      {props.journalIndex && (
        <Fragment>
          <td>
            <span
              title={dateFormat(
                props.journal[props.journalIndex].date,
                'ddd, dS mmm, yyyy, h:MM:ss TT'
              )}
            >
              {dateFormat(
                props.journal[props.journalIndex].date,
                'ddd, dS mmm'
              )}
            </span>
          </td>
          <td>
            {props.journal[props.journalIndex].debit.name} - (
            {props.journal[props.journalIndex].credit.name})
          </td>
          <td>{props.journal[props.journalIndex].description}</td>
          <td className='txtRight' style={{ textAlign: 'right' }}>
            <span>৳</span>{' '}
            {fmt.format(props.journal[props.journalIndex].amount, 2)}
          </td>
          <td>{props.journal[props.journalIndex].comment}</td>
        </Fragment>
      )}
    </Modal>
  )

export default JournalDetailModal
