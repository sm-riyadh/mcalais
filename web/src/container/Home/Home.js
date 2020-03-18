import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import KeyboardJS from 'keyboardjs'

import { fetchCoaList, sendJournal, fetchCoa, updateJournal } from '../../store/actions'
import { SideBar } from '../../component'
import { NavBar } from '../../component/layout'

import JournalEntry from '../Global/JournalEntry'

import Header from '../Header/Header'
import Journal from '../Journal/Journal'
import Coa from '../Coa/Coa'
import Company from '../Company/Company'

// import container from '../../component/container/container'

export class Home extends Component {
  componentDidMount() {
    this.props.fetchCoa({ company: this.props.company })
    this.props.fetchCoaList({ company: this.props.company })

    KeyboardJS.bind(
      'ctrl + enter',
      e => {
        e.preventRepeat()
        this.toggleModal('modal_journal_entry', !this.state.modal_journal_entry)
      },
      () => {}
    )
    KeyboardJS.bind(
      'backspace',
      e => {
        this.props.history.goBack()
      },
      () => {}
    )
    KeyboardJS.bind(
      'shift + j',
      e => {
        this.props.history.push('/journal')
      },
      () => {}
    )
    KeyboardJS.bind(
      'shift + a',
      e => {
        this.props.history.push('/coa')
      },
      () => {}
    )
    KeyboardJS.bind(
      'shift + c',
      e => {
        this.props.history.push('/company')
      },
      () => {}
    )
  }
  state = { modal_journal_entry: false }
  toggleModal = (name, action) => this.setState({ [name]: action })
  render() {
    return (
      <Fragment>
        <Header />
        <main>
          <SideBar collapsed={this.props.collapsed}>
            <section className='navbar'>
              <NavBar title='Dashboard' path='/home' icon='poll' collapsed={this.props.collapsed} />
              <NavBar title='Journal' path='/journal' icon='class' collapsed={this.props.collapsed} />
              <NavBar title='Chart of Accounts' path='/coa' icon='account_tree' collapsed={this.props.collapsed} />
              <NavBar title='Company' path='/company' icon='storage' collapsed={this.props.collapsed} />
            </section>

            <section className='widget-footer'>
              hello
              {/* <ReactToPrint
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
            </button> */}
            </section>
          </SideBar>

          <Switch>
            <Route path='/' exact key={this.props.company}>
              <h2>Coming Soon</h2>
            </Route>
            <Route path='/home' exact key={this.props.company}>
              <h2>Coming Soon</h2>
            </Route>
            <Route
              path='/journal'
              render={props => <Journal {...props} toggleModal={this.toggleModal} />}
              key={this.props.company}
            />
            <Route path='/coa' component={Coa} key={this.props.company} />
            <Route path='/company' component={Company} key={this.props.company} />
          </Switch>
          <JournalEntry
            isModalOpen={this.state.modal_journal_entry}
            modalClose={() => this.toggleModal('modal_journal_entry', false)}
            sendJournal={payload => {
              this.props.sendJournal(payload)
              this.props.fetchCoaList({ company: this.props.company })
            }}
            input={this.props.journal.input}
            inputHandler={this.props.updateJournal}
            coa={this.props.coa}
            company={this.props.company}
          />
        </main>
        {/* <SideBar position='right'></SideBar> */}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  sidebar_collapse : state.main.sidebar_collapse,
  coa              : state.coa.coa,
  journal          : state.journal,
  company          : state.main.company,
})
const mapDispatchToProps = dispatch => ({
  updateJournal : payload => dispatch(updateJournal(payload)),
  fetchCoa      : payload => dispatch(fetchCoa(payload)),
  fetchCoaList  : payload => dispatch(fetchCoaList(payload)),
  sendJournal   : payload => dispatch(sendJournal(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
