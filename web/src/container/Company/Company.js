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

import CompanyEntry from './components/CompanyEntry'

export class Journal extends Component {
  componentDidMount() {
    this.props.fetchCoa({ company: this.props.company })
    this.props.fetchCoaList({ company: this.props.company })
    this.props.fetchJournal({ company: this.props.company })
  }

  state = {
    modal_journal_details: false,

    modal_company_entry: false,
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
            <div></div>
            <button
              className='btn btn-chip primary'
              onClick={() => {
                this.toggleModal('modal_company_entry', true)
              }}
            >
              New Company &nbsp;&nbsp; +
            </button>
          </Container>
          <Card className='p-top-5' vertical noPad expand>
            <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
              <b>Companies</b>
            </Container>
            <Card className='p-top-5' vertical noPad expand>
              <table className='table-card'>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Accounts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>HQ</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>HQ</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>HQ</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>HQ</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>HQ</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>HQ</td>
                    <td>100</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </Card>
        </Container>
        <CompanyEntry
          isModalOpen={this.state.modal_company_entry}
          modalClose={() => this.toggleModal('modal_company_entry', false)}
          sendJournal={this.props.sendJournal}
          // coa={this.props.coa}
          company={this.props.company}
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
