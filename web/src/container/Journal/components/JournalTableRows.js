import React from 'react'
import dateFormat from 'dateformat'
import fmt from 'indian-number-format'

const JournalTableRows = props =>
  props.data.length !== 0 ? (
    props.data.map(
      ({ description, date, debit, credit, amount, comment }, index) => (
        <tr
          key={index}
          onClick={() => {
            props.modalOpen()
            props.setJournalIndex(index)
          }}
        >
          <td className='txtRight'>{index + 1}</td>
          <td>
            <span title={dateFormat(date, 'ddd, dS mmm, yyyy, h:MM:ss TT')}>
              {dateFormat(date, 'ddd, dS mmm')}
            </span>
          </td>
          <td>
            {debit.name} - ({credit.name})
          </td>
          <td>{description}</td>
          <td className='txtRight' style={{ textAlign: 'right' }}>
            <span>৳</span> {fmt.format(amount, 2)}
          </td>
          <td>{comment}</td>
        </tr>
      )
    )
  ) : (
    <tr>
      <td className='txtRight'>..</td>
      <td>....</td>
      <td>... - ...</td>
      <td>...</td>
      <td className='txtRight' style={{ textAlign: 'right' }}>
        <span>৳</span> ...
      </td>
      <td>...</td>
    </tr>
  )

export default JournalTableRows
