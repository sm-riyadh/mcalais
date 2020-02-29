import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { Modal, Container, Card, Text, Placeholder } from '../../component'
import { fetchCompany, sendCompany } from '../../store/actions'

import CompanyEntry from './components/CompanyEntry'

export class Journal extends Component {
  componentDidMount() {
    this.props.fetchCompany()
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
                    <th rowSpan='2'>No</th>
                    <th rowSpan='2'>Name</th>
                    <th style={{ textAlign: 'center' }} colSpan='5'>
                      Accounts (Balance)
                    </th>
                  </tr>
                  <tr>
                    <th>Assets</th>
                    <th>Liabilities</th>
                    <th>Equities</th>
                    <th>Expenses</th>
                    <th>Incomes</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.company.map(
                    ({ name, account_count, balance }, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        {account_count && balance && (
                          <Fragment>
                            <td>
                              {account_count.assets} ({balance.assets})
                            </td>
                            <td>
                              {account_count.liabilities} ({balance.liabilities}
                              )
                            </td>
                            <td>
                              {account_count.equities} ({balance.equities})
                            </td>
                            <td>
                              {account_count.expenses} ({balance.expenses})
                            </td>
                            <td>
                              {account_count.incomes} ({balance.incomes})
                            </td>
                          </Fragment>
                        )}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </Card>
          </Card>
        </Container>
        <CompanyEntry
          isModalOpen={this.state.modal_company_entry}
          modalClose={() => this.toggleModal('modal_company_entry', false)}
          sendCompany={this.props.sendCompany}
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
  current_company: state.main.company,
  company: state.company.company,
})
const mapDispatchToProps = dispatch => ({
  fetchCompany: () => dispatch(fetchCompany()),
  sendCompany: payload => dispatch(sendCompany(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Journal)
