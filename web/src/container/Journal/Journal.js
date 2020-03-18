import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ReactToPrint from 'react-to-print'

import { Modal, Container, Card, Text, Placeholder } from '../../component'
import { fetchCoa, fetchCoaList, fetchJournal, fetchJournalMore, sendJournal } from '../../store/actions'
import { ActivityBar } from '../../component/layout'

import JournalTableRows from './components/JournalTableRows'
import JournalDetailModal from './components/JournalDetailModal'

export class Journal extends Component {
  componentDidMount() {
    this.props.fetchCoa({ company: this.props.company })
    this.props.fetchCoaList({ company: this.props.company })
    this.props.fetchJournal({ company: this.props.company })
  }

  state = {
    modal_journal_details : false,
    journal_index         : '',

    page                  : 0,
    coa_filter            : '',
  }

  toggleModal = (name, action) => this.setState({ [name]: action })
  setJournalIndex = index => this.setState({ journal_index: index })

  coaFilterChangeHandler = e => {
    const { value } = e.target
    this.setState({ coa_filter: value }, () =>
      this.props.fetchJournal({
        company : this.props.company,
        coa     : this.state.coa_filter,
      })
    )
  }
  appendMore = () => {
    this.setState(
      state => ({
        page : state.page + 1,
      }),
      () =>
        this.props.fetchJournalMore({
          company : 'HQ',
          page    : this.state.page,
          coa     : this.state.coa_filter,
        })
    )
  }

  render() {
    return (
      <Fragment>
        {this.props.status.success && this.props.coa_status.success ? (
          <Container vertical className='scrollable p-hor-8 p-top-5'>
            <Card className='p-top-5' vertical noPad expand>
              <Container className='card-header flex-pos-between p-hor-6'>
                <Text>Journal</Text>
              </Container>
              <table className='table-card' ref={e => (this.testRef = e)}>
                <thead>
                  <tr>
                    <th className='txtRight'>No.</th>
                    <th>Date</th>
                    <th>Destination</th>
                    <th>Source</th>
                    <th>Voucher ID</th>
                    <th>Description</th>
                    <th className='txtRight'>Amount</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  <JournalTableRows
                    data={this.props.journal}
                    modalOpen={() => this.toggleModal('modal_journal_details', true)}
                    setJournalIndex={this.setJournalIndex}
                    filterCoa={this.state.coa_filter}
                  />
                </tbody>
              </table>
              <button onClick={this.appendMore}>Show more</button>
            </Card>
          </Container>
        ) : this.props.status.request && this.props.coa_status.request ? (
          <Placeholder type='table' />
        ) : (
          <b style={{ padding: '10rem', color: '#dd3838' }}>{this.props.status.message}</b>
        )}
        <ActivityBar>
          {this.props.status.success && this.props.coa_status.success ? (
            <Fragment>
              <section>
                <div className='widget-header'>
                  <i className='material-icons p-right'>filter</i> Filter
                </div>
                <div className='widget'>
                  <label>
                    <p>Voucher ID</p>
                    <input type='text' className='' placeholder='Search...' />
                  </label>
                </div>
                <div className='widget'>
                  <label>
                    <p>View Type</p>
                    <select name='company' className=''>
                      <option value='journal'>Journal</option>
                      <option value='expenses'>Expenses</option>
                      <option value='incomes'>Incomes</option>
                    </select>
                  </label>
                </div>
                <div className='widget'>
                  <label>
                    <p>Accounts</p>
                    <select name='coa_filter' className='' onChange={this.coaFilterChangeHandler}>
                      <option value=''>All</option>
                      {this.props.coa_list.map(coa => <option value={coa.code}>{coa.name}</option>)}
                    </select>
                  </label>
                </div>
              </section>

              <section className='widget-footer'>
                <ReactToPrint
                  trigger={() => (
                    <button className='btn m-bottom-2'>
                      Print This <i className='material-icons'>print</i>
                    </button>
                  )}
                  content={() => this.testRef}
                />
                <button
                  className='btn primary'
                  onClick={() => {
                    this.props.toggleModal('modal_journal_entry', true)
                  }}
                >
                  New Voucher <i className='material-icons'>add</i>
                </button>
              </section>
            </Fragment>
          ) : this.props.status.request && this.props.coa_status.request ? (
            <Placeholder type='table' />
          ) : (
            <b style={{ padding: '10rem', color: '#dd3838' }}>{this.props.status.message}</b>
          )}
        </ActivityBar>
      </Fragment>
    )
  }
}
const mapStateToProps = state => ({
  company    : state.main.company,
  journal    : state.journal.journal,
  status     : state.journal.status,
  coa        : state.coa.coa,
  coa_list   : state.coa.coa_list,
  coa_status : state.coa.status,
})
const mapDispatchToProps = dispatch => ({
  fetchCoa         : payload => dispatch(fetchCoa(payload)),
  fetchCoaList     : payload => dispatch(fetchCoaList(payload)),
  fetchJournal     : payload => dispatch(fetchJournal(payload)),
  fetchJournalMore : payload => dispatch(fetchJournalMore(payload)),
  sendJournal      : payload => dispatch(sendJournal(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Journal)
