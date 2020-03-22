import React, { Component, Fragment } from 'react'
import dateFormat from 'dateformat'
import fmt from 'indian-number-format'

import { Text } from '../../../component/'

const JournalTableRows = props =>
  props.data ? (
    props.data
      .filter(
        ({ debit, credit }) =>
          debit.name.match(new RegExp(`(s|${props.filterAccount})`)) ||
          credit.name.match(new RegExp(`(s|${props.filterAccount})`))
      )
      .filter(({ id }) => id.match(new RegExp(`(s|${props.filterVoucherId})`)))
      .map(({ id, description, date, debit, credit, amount, comment }, index) => (
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
              {new Date(date).getFullYear() === new Date().getFullYear() ? (
                dateFormat(date, 'dS mmm')
              ) : (
                dateFormat(date, 'dS mmm, yyyy')
              )}
            </span>
          </td>
          <td>
            {debit.name}
            <br />
            {debit.note && (
              <Text subTitle>
                <i className='material-icons'>format_quote</i> {debit.note}
              </Text>
            )}
          </td>
          <td>
            {credit.name}
            <br />
            {credit.note && (
              <Text subTitle>
                <i className='material-icons'>format_quote</i> {credit.note}
              </Text>
            )}
          </td>
          <td>{id}</td>
          <td>{description}</td>
          <td className='txtRight' style={{ textAlign: 'right' }}>
            <span>৳</span> {fmt.format(amount, 2)}
          </td>
          <td>{comment}</td>
        </tr>
      ))
  ) : (
    <Fragment>
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
    </Fragment>
  )

export default JournalTableRows
