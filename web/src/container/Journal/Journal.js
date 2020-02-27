import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { Modal, Container, Card, Text, Placeholder } from '../../component'
import {
  fetchCoa,
  fetchCoaList,
  fetchJournal,
  fetchJournalMore,
  sendJournal,
} from '../../store/actions'

import JournalTableRows from './components/JournalTableRows'
import JournalDetailModal from './components/JournalDetailModal'
import JournalEntry from './components/JournalEntry'

export class Journal extends Component {
  componentDidMount() {
    this.props.fetchCoa({ company: this.props.company })
    this.props.fetchCoaList({ company: this.props.company })
    this.props.fetchJournal({ company: this.props.company })
  }

  state = {
    modal_journal_details: false,

    modal_journal_entry: false,
    journal_index: '',

    page: 0,
    coa_filter: '',
  }

  toggleModal = (name, action) => this.setState({ [name]: action })
  setJournalIndex = index => this.setState({ journal_index: index })

  coaFilterChangeHandler = e => {
    const { value } = e.target
    this.setState({ coa_filter: value }, () =>
      this.props.fetchJournal({
        company: this.props.company,
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
          company: 'HQ',
          page: this.state.page,
          coa: this.state.coa_filter,
        })
    )
  }

  render() {
    return 1 === 1 ? (
      <Fragment>
        <Container vertical className='scrollable p-hor-8 p-top-5'>
          <Container className='flex-pos-between p-hor-4 p-bottom-4'>
            <div>
              {/* <select
              name='company'
              className='btn btn-chip m-right-2'
              onChange={this.mainChangeHandler}
              value={this.props.company}
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
            <button
              className='btn btn-chip primary'
              onClick={() => {
                this.toggleModal('modal_journal_entry', true)
              }}
            >
              ADD &nbsp;&nbsp; +
            </button>
          </Container>
          <Card className='p-top-5' vertical noPad expand>
            <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
              <Text>
                <b>Journal</b>
              </Text>
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
                  modalOpen={() =>
                    this.toggleModal('modal_journal_details', true)
                  }
                  setJournalIndex={this.setJournalIndex}
                  filterCoa={this.state.coa_filter}
                />
              </tbody>
            </table>
            <button onClick={this.appendMore}>Show more</button>
          </Card>
        </Container>
        <JournalEntry
          isModalOpen={this.state.modal_journal_entry}
          modalClose={() => this.toggleModal('modal_journal_entry', false)}
          sendJournal={this.props.sendJournal}
          coa={this.props.coa}
          company={this.props.company}
        />
        <JournalDetailModal
          isModalOpen={this.state.modal_journal_details}
          modalClose={() => this.toggleModal('modal_journal_details', false)}
          journalIndex={this.state.journal_index}
        />
      </Fragment>
    ) : (
      <Placeholder type='table' />
    )
  }
}

const mapStateToProps = state => ({
  company: state.main.company,
  journal: state.journal.journal,
  coa: state.coa.coa,
  coa_list: state.coa.coa_list,
})
const mapDispatchToProps = dispatch => ({
  fetchCoa: payload => dispatch(fetchCoa(payload)),
  fetchCoaList: payload => dispatch(fetchCoaList(payload)),
  fetchJournal: payload => dispatch(fetchJournal(payload)),
  fetchJournalMore: payload => dispatch(fetchJournalMore(payload)),
  sendJournal: payload => dispatch(sendJournal(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Journal)
