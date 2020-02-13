import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import fmt from 'indian-number-format'

import { Modal, Container, Card, Text, Placeholder } from '../../component'
import {
  fetchCoaList,
  fetchJournal,
  fetchJournalMore,
} from '../../store/actions'

import JournalTableRows from './components/JournalTableRows'

export class Journal extends Component {
  state = {
    journal_index: '',
    journal_modal: false,
    page: 0,
    coa_filter: '',
  }
  componentDidMount() {
    this.props.fetchCoaList({ site: this.props.site })
    this.props.fetchJournal({ site: this.props.site })
  }

  toggleModal = action => this.setState({ journal_modal: action })
  setJournalIndex = index => this.setState({ journal_index: index })
  changeHandler = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }
  coaFilterChangeHandler = e => {
    const { value } = e.target
    this.setState({ coa_filter: value }, () =>
      this.props.fetchJournal({
        site: this.props.site,
        coa: this.state.coa_filter,
      })
    )
  }
  appendMore = () => {
    this.setState(
      state => ({
        page: state.page + 1,
      }),
      () =>
        this.props.fetchJournalMore({
          site: 'HQ',
          page: this.state.page,
          coa: this.state.coa_filter,
        })
    )
  }

  render() {
    return 1 === 1 ? (
      <Container vertical className='scrollable p-hor-8 p-top-5'>
        <Container className='flex-pos-between p-hor-4 p-bottom-4'>
          <div>
            {/* <select
              name='site'
              className='btn btn-chip m-right-2'
              onChange={this.mainChangeHandler}
              value={this.props.site}
            >
              <option value='HQ'>HQ</option>
              <option value='SUST Boundary'>SUST Boundary</option>
            </select>
            <input
              type='text'
              className='btn btn-chip m-right-2'
              placeholder='Search...'
            /> */}
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
                name='coa_filter'
                className='btn btn-chip'
                onChange={this.coaFilterChangeHandler}
              >
                <option value=''>All</option>
                {this.props.coa_list.map(coa => (
                  <option value={coa.code}>{coa.name}</option>
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
                filterCoa={this.state.coa_filter}
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
  site: state.main.site,
  journal: state.journal.journal,
  coa_list: state.coa.coa_list,
})
const mapDispatchToProps = dispatch => ({
  fetchCoaList: payload => dispatch(fetchCoaList(payload)),
  fetchJournal: payload => dispatch(fetchJournal(payload)),
  fetchJournalMore: payload => dispatch(fetchJournalMore(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Journal)
