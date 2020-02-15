import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import {
  // Modal,
  Container,
  Card,
  Text,
  Placeholder,
} from '../../component'

import { fetchCoa, sendCoa } from '../../store/actions'

import CoaTableRows from './components/CoaTableRows'
import CoaManager from './components/CoaManager'

export class Coa extends Component {
  componentDidMount() {
    this.props.fetchCoa({ company: this.props.company })
  }

  state = {
    filter: '',
    modal_coa_manager: false,
  }
  changeHandler = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }
  toggleModal = (name, action) => this.setState({ [name]: action })

  render() {
    return 1 === 1 ? (
      <Container vertical className='scrollable p-hor-8 p-top-5'>
        <Container className='flex-pos-between p-hor-4 p-bottom-4'>
          <div>
            <select
              name='filter'
              className='btn btn-chip m-right-2'
              onChange={this.changeHandler}
              value={this.state.company}
            >
              <option value=''>All</option>
              <option value='assets'>Assets</option>
              <option value='liabilities'>Liabilities</option>
              <option value='equity'>Equity</option>
              <option value='expenses'>Expenses</option>
              <option value='incomes'>Incomes</option>
            </select>
          </div>
          <button
            className='btn btn-chip primary'
            onClick={() => {
              this.toggleModal('modal_coa_manager', true)
            }}
          >
            COA MANAGER &nbsp;&nbsp; +
          </button>
        </Container>
        <Card className='p-top-5' vertical noPad expand>
          <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
            <Text>Assets</Text>
          </Container>
          <table className='table-card'>
            <thead>
              <tr>
                <th className='txtRight'>No.</th>
                <th>Name</th>
                <th className='txtRight'>Balance</th>
              </tr>
            </thead>
            <tbody>
              <CoaTableRows
                data={this.props.coa}
                accountOf={'assets'}
                // modalOpen={() => this.toggleModal(true)}
                // setJournalIndex={this.setJournalIndex}
                // filterCoa={this.state.coa_filter}
              />
            </tbody>
          </table>
          <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
            <Text>Liabilities</Text>
          </Container>
          <table className='table-card'>
            <thead>
              <tr>
                <th className='txtRight'>No.</th>
                <th>Name</th>
                <th className='txtRight'>Balance</th>
              </tr>
            </thead>
            <tbody>
              <CoaTableRows
                data={this.props.coa}
                accountOf={'liabilities'}
                // modalOpen={() => this.toggleModal(true)}
                // setJournalIndex={this.setJournalIndex}
                // filterCoa={this.state.coa_filter}
              />
            </tbody>
          </table>
          <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
            <Text>Equity</Text>
          </Container>
          <table className='table-card'>
            <thead>
              <tr>
                <th className='txtRight'>No.</th>
                <th>Name</th>
                <th className='txtRight'>Balance</th>
              </tr>
            </thead>
            <tbody>
              <CoaTableRows
                data={this.props.coa}
                accountOf={'equities'}
                // modalOpen={() => this.toggleModal(true)}
                // setJournalIndex={this.setJournalIndex}
                // filterCoa={this.state.coa_filter}
              />
            </tbody>
          </table>
          <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
            <Text>Expenses</Text>
          </Container>
          <table className='table-card'>
            <thead>
              <tr>
                <th className='txtRight'>No.</th>
                <th>Name</th>
                <th className='txtRight'>Balance</th>
              </tr>
            </thead>
            <tbody>
              <CoaTableRows
                data={this.props.coa}
                accountOf={'expenses'}
                // modalOpen={() => this.toggleModal(true)}
                // setJournalIndex={this.setJournalIndex}
                // filterCoa={this.state.coa_filter}
              />
            </tbody>
          </table>
          <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
            <Text>Incomes</Text>
          </Container>
          <table className='table-card'>
            <thead>
              <tr>
                <th className='txtRight'>No.</th>
                <th>Name</th>
                <th className='txtRight'>Balance</th>
              </tr>
            </thead>
            <tbody>
              <CoaTableRows
                data={this.props.coa}
                accountOf={'incomes'}
                // modalOpen={() => this.toggleModal(true)}
                // setJournalIndex={this.setJournalIndex}
                // filterCoa={this.state.coa_filter}
              />
            </tbody>
          </table>

          <CoaManager
            isModalOpen={this.state.modal_coa_manager}
            modalClose={() => this.toggleModal('modal_coa_manager', false)}
            sendAccount={this.props.sendCoa}
            company={this.props.company}
          />
          {/* {this.state.journal_modal && (
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
             */}
        </Card>
      </Container>
    ) : (
      <Placeholder type='table' />
    )
  }
}

const mapStateToProps = state => ({
  company: state.main.company,
  coa: state.coa.coa,
})
const mapDispatchToProps = dispatch => ({
  fetchCoa: payload => dispatch(fetchCoa(payload)),
  sendCoa: payload => dispatch(sendCoa(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Coa)
