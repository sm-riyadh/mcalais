import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { ActivityBar } from '../../component/layout'
import { Modal, Container, Card, Text, Placeholder } from '../../component'
import { companyAction } from '../../store/actions'

import CompanyEntry from './components/CompanyCreate'
import CompanySettings from './components/CompanySettings'

export class Company extends Component {
  componentDidMount() {
    // this.props.fetchCompany()
  }

  state = {
    modal_journal_details : false,

    modal_create          : false,
    journal_index         : '',

    page                  : 0,
    account_filter        : '',
  }

  toggleModal = (name, action) => this.setState({ [name]: action })
  setJournalIndex = index => this.setState({ journal_index: index })

  render() {
    return (
      <Fragment>
        <Container vertical className='scrollable p-hor-8 p-top-5'>
          <Container className='flex-pos-between p-hor-4 p-bottom-4'>
            <div />
            <button
              className='btn btn-chip primary'
              onClick={() => {
                this.toggleModal('modal_create', true)
              }}
            >
              New Company &nbsp;&nbsp; +
            </button>
          </Container>
          <Card className='p-top-5 p-5' vertical noPad expand>
            <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
              <b>Companies</b>
              <div>
                <b className='m-right-3'>Total: {this.props.company.length}</b>
                {/* <select
                  className='btn btn-chip'
                  onClick={() => {
                    this.toggleModal('modal_create', true)
                  }}
                >
                  <option>A - Z</option>
                </select> */}
              </div>
            </Container>
            {this.props.company.map(({ id, name, isDisabled, account_count, balance }, index) => (
              <div
                key={index}
                className='company-card'
                // Temp
                style={isDisabled ? { backgroundColor: '#eee' } : {}}
                style={id === this.props.settings.selectedCompany ? { borderColor: 'seagreen' } : {}}
              >
                <div key={index}>
                  <p className='company-title'>{name}</p>
                  <p>Description goes here...</p>
                </div>
                <div key={index} className='company-buttons'>
                  <button
                    className='btn btn-chip black'
                    onClick={() => this.setState({ selected_company: id, modal_settings: true })}
                  >
                    Settings
                  </button>
                </div>
              </div>
            ))}
          </Card>
          {this.state.selected_company && (
            <CompanySettings
              isModalOpen={this.state.modal_settings}
              selectedCompany={this.props.company.find(e => e.id === this.state.selected_company)}
              modalClose={() => this.toggleModal('modal_settings', false)}
              modifyCompany={this.props.modifyCompany}
              removeCompany={() => this.props.removeCompany({ id: this.state.selected_company })}
              activateCompany={() => this.props.activateCompany({ id: this.state.selected_company })}
              deactivateCompany={() => this.props.deactivateCompany({ id: this.state.selected_company })}
            />
          )}
          <CompanyEntry
            isModalOpen={this.state.modal_create}
            modalClose={() => this.toggleModal('modal_create', false)}
            createCompany={this.props.createCompany}
            // account={this.props.account}
            company={this.props.company}
          />
        </Container>

        <ActivityBar>
          <Fragment>
            <section>
              <div className='widget-header'>
                <i className='material-icons p-right'>filter</i> Filter
              </div>
            </section>
          </Fragment>
        </ActivityBar>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  company  : state.company.company,
  settings : state.settings,
  status   : state.company.status,
})
const mapDispatchToProps = dispatch => ({
  createCompany     : payload => dispatch(companyAction.send.create(payload)),
  modifyCompany     : payload => dispatch(companyAction.send.modify(payload)),
  activateCompany   : payload => dispatch(companyAction.send.activate(payload)),
  deactivateCompany : payload => dispatch(companyAction.send.deactivate(payload)),
  removeCompany     : payload => dispatch(companyAction.send.remove(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Company)
