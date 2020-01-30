import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import fmt from 'indian-number-format'

import {
  Modal,
  Container,
  Card,
  Text,
  Placeholder,
} from '../../component/common'
import {
  fetchLedgerList,
  fetchJournal,
  fetchJournalMore,
} from '../../store/actions'

import JournalTableRows from './components/JournalTableRows'

export class Journal extends Component {
  componentDidMount() {
    this.props.fetchLedgerList()
    this.props.fetchJournal()
  }
  state = {
    journal_index: '',
    journal_modal: false,
    page: 0,
    ledger_filter: '',
  }
  toggleModal = action => this.setState({ journal_modal: action })
  setJournalIndex = index => this.setState({ journal_index: index })
  changeHandler = e => {
    const { name, value } = value
    this.setState({ [name]: value })
  }
  ledgerFilterChangeHandler = e => {
    const { value } = e.target
    this.setState({ ledger_filter: value }, () =>
      this.props.fetchJournal({ ledger: this.state.ledger_filter })
    )
  }
  appendMore = () => {
    this.setState(
      state => ({
        page: state.page + 1,
      }),
      () =>
        this.props.fetchJournalMore({
          page: this.state.page,
          ledger: this.state.ledger_filter,
        })
    )
  }

  render() {
    return 1 === 1 ? (
      <Container vertical className='scrollable p-hor-8 p-top-5'>
        <Container className='flex-pos-between p-hor-4 p-bottom-4'>
          <div>
            <select className='btn btn-chip m-right-2'>
              <option>Journal</option>
            </select>
            <input
              type='text'
              className='btn btn-chip m-right-2'
              placeholder='Search...'
            />
          </div>
          <button className='btn btn-chip primary'>ADD &nbsp;&nbsp; +</button>
        </Container>
        <Card className='p-top-5' vertical noPad expand>
          <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
            <Text>Journal</Text>
            <div>
              {/* <select className='btn btn-chip'>
              <option>Sort by...</option>
            </select> */}
              <select
                name='ledger_filter'
                className='btn btn-chip'
                onChange={this.ledgerFilterChangeHandler}
              >
                <option value=''>All</option>
                {this.props.ledger_list.map(ledger => (
                  <option value={ledger.code}>{ledger.name}</option>
                ))}
              </select>
              <select className='btn btn-chip'>
                <option>Today</option>
                <option>Tomorrow</option>
                <option>3 Days</option>
                <option>Month</option>
              </select>
            </div>
          </Container>
          <table className='table-card'>
            <thead>
              <tr>
                <th className='txtRight'>No.</th>
                <th>Date</th>
                <th>Destination (Source)</th>
                <th>Description</th>
                <th className='txtRight'>Amount</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              <JournalTableRows
                data={this.props.journal}
                modalOpen={() => this.toggleModal(true)}
                setJournalIndex={this.setJournalIndex}
                filterLedger={this.state.ledger_filter}
              />
            </tbody>
          </table>
          <button onClick={this.appendMore}>Show more</button>
          {this.state.journal_modal && (
            <Modal title='Journal' modalClose={() => this.toggleModal(false)}>
              {this.state.journal_index && (
                <Fragment>
                  <td>
                    <span
                      title={dateFormat(
                        this.props.journal[this.state.journal_index].date,
                        'ddd, dS mmm, yyyy, h:MM:ss TT'
                      )}
                    >
                      {dateFormat(
                        this.props.journal[this.state.journal_index].date,
                        'ddd, dS mmm'
                      )}
                    </span>
                  </td>
                  <td>
                    {this.props.journal[this.state.journal_index].debit.name} -
                    ({this.props.journal[this.state.journal_index].credit.name})
                  </td>
                  <td>
                    {this.props.journal[this.state.journal_index].description}
                  </td>
                  <td className='txtRight' style={{ textAlign: 'right' }}>
                    <span>৳</span>{' '}
                    {fmt.format(
                      this.props.journal[this.state.journal_index].amount,
                      2
                    )}
                  </td>
                  <td>
                    {this.props.journal[this.state.journal_index].comment}
                  </td>
                </Fragment>
              )}
            </Modal>
          )}
        </Card>
      </Container>
    ) : (
      <Placeholder type='table' />
    )
  }
}

const mapStateToProps = state => ({
  journal: state.journal.journal,
  ledger_list: state.ledger.ledger_list,
})
const mapDispatchToProps = dispatch => ({
  fetchLedgerList: payload => dispatch(fetchLedgerList(payload)),
  fetchJournal: payload => dispatch(fetchJournal(payload)),
  fetchJournalMore: payload => dispatch(fetchJournalMore(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Journal)
