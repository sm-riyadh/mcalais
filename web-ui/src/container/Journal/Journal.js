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
  fetchJournalInit,
  fetchJournalMore,
  fetchJournalOfAccount,
} from '../../store/actions'

import JournalTableRows from './components/JournalTableRows'

export class Journal extends Component {
  componentDidMount() {
    this.props.fetchJournalInit()
  }
  state = {
    journal_index: '',
    journal_modal: false,
    page: 0,
    account_filter: '',
  }
  toggleModal = action => this.setState({ journal_modal: action })
  setJournalIndex = index => this.setState({ journal_index: index })
  changeHandler = e => {
    const { name, value } = value
    this.setState({ [name]: value })
  }
  accountFilterChangeHandler = e => {
    const { value } = e.target.value
    this.setState({ account_filter: value })

    this.props.fetchJournalOfAccount({ account: value })
  }
  addPage = () => {
    this.setState(
      state => ({
        page: state.page + 1,
      }),
      () =>
        this.props.fetchJournalMore({
          page: this.state.page,
          account: this.state.account,
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
                name='account_filter'
                className='btn btn-chip'
                onChange={this.accountFilterChangeHandler}
              >
                <option value=''>All</option>
                {this.props.account_list.map(account => (
                  <option value={account.code}>{account.name}</option>
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
                filterAccount={this.state.account_filter}
              />
            </tbody>
          </table>
          <button onClick={this.addPage}>Show more</button>
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
  account_list: state.journal.account_list,
})
const mapDispatchToProps = dispatch => ({
  fetchJournalInit: payload => dispatch(fetchJournalInit(payload)),
  fetchJournalMore: payload => dispatch(fetchJournalMore(payload)),
  fetchJournalOfAccount: payload => dispatch(fetchJournalOfAccount(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Journal)
