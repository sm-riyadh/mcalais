import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import KeyboardJS from 'keyboardjs'

import { fetchAccountNonempty, sendJournal, fetchAccount, updateJournal } from '../../store/actions'
import { SideBar } from '../../component'
import { NavBar } from '../../component/layout'

import JournalEntry from '../Global/JournalEntry'

import Header from '../Header/Header'
import Journal from '../Journal/Journal'
import Account from '../Account/Account'
import Company from '../Company/Company'
import TestGround from '../TestGround/TestGround'

// import container from '../../component/container/container'

export class Home extends Component {
  componentDidMount() {
    this.props.fetchAccount({ company: this.props.company })
    this.props.fetchAccountNonempty({ company: this.props.company })

    KeyboardJS.bind(
      'ctrl + enter',
      e => {
        e.preventRepeat()
        this.toggleModal('modal_journal_entry', !this.state.modal_journal_entry)
      },
      () => {}
    )
    KeyboardJS.bind(
      'ctrl + backspace',
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
        this.props.history.push('/account')
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
              <NavBar title='Book Keeping' path='/journal' icon='class' collapsed={this.props.collapsed} />
              <NavBar title='Inventory' path='/inventory' icon='storage' collapsed={this.props.collapsed} />
              <NavBar title='Employee' path='/employee' icon='supervisor_account' collapsed={this.props.collapsed} />
              <NavBar title='Report' path='/report' icon='assignment' collapsed={this.props.collapsed} />
              <NavBar title='TESTING GROUND' path='/test' icon='lock' collapsed={this.props.collapsed} />
            </section>

            <section className='navbar widget-footer'>
              <NavBar title='Chart of Accounts' path='/account' icon='account_tree' collapsed={this.props.collapsed} />
              <NavBar title='Company' path='/company' icon='storage' collapsed={this.props.collapsed} />
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
            <Route path='/account' component={Account} key={this.props.company} />
            <Route path='/company' component={Company} key={this.props.company} />
            <Route path='/test' component={TestGround} key={this.props.company} />
          </Switch>
          <JournalEntry
            isModalOpen={this.state.modal_journal_entry}
            modalClose={() => this.toggleModal('modal_journal_entry', false)}
            sendJournal={payload => {
              this.props.sendJournal(payload)
              this.props.fetchAccountNonempty({ company: this.props.company })
            }}
            input={this.props.journal.input}
            inputHandler={this.props.updateJournal}
            account={this.props.account}
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
  account          : state.account.account,
  journal          : state.journal,
  company          : state.main.company,
})
const mapDispatchToProps = dispatch => ({
  updateJournal        : payload => dispatch(updateJournal(payload)),
  fetchAccount         : payload => dispatch(fetchAccount(payload)),
  fetchAccountNonempty : payload => dispatch(fetchAccountNonempty(payload)),
  sendJournal          : payload => dispatch(sendJournal(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
