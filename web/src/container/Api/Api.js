import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { subDays } from 'date-fns'

import { journalAction, accountAction, companyAction } from '../../store/actions'

export class Api extends Component {
  componentDidMount() {
    /* ------------------------------ NOTE: Journal ----------------------------- */
    // this.props.fetch({
    //   company    : '5e8f203e1a53001dec074c9a',
    //   type       : 'journal',
    //   size       : 12,
    //   page       : 0,
    //   start_date : subDays(new Date(), 100),
    //   end_date   : new Date(),
    // })
    // this.props.fetch({ id: '5e8cd40dcb2e822624229d60' })
    // this.props.create({
    //   date        : new Date(),
    //   company     : '5e8f203e1a53001dec074c9a',
    //   credit      : '5e8f203f1a53001dec074c9b',
    //   credit_note : 'optional',
    //   debit       : '5e8f20411a53001dec074c9f',
    //   debit_note  : 'optional',
    //   description : 'Description from web',
    //   amount      : 9999,
    //   comment     : 'Comment from web',
    // })
    // this.props.modify({
    // id          : '5e8cd40dcb2e822624229d60',
    // date        : new Date(),
    // company     : 'HQ',
    // credit_note : 'optional mod',
    // debit_note  : 'optional mod',
    // description : 'Description from web mod',
    // comment     : 'Comment from web mod',
    // })
    // this.props.activate({ id: '5e8cd40dcb2e822624229d60' })
    // this.props.deactivate({ id: '5e8cd40dcb2e822624229d60' })
    /* ------------------------------ NOTE: Account ----------------------------- */
    // this.props.fetch({
    //   company : '5e8f203e1a53001dec074c9a',
    //   // nonempty : true,
    // })
    // this.props.fetch({ id: '5e8faa5ac12feb126c5d74e0' })
    // this.props.create({
    //   company : '5e8f203e1a53001dec074c9a',
    //   name    : 'test',
    //   type    : 'equities',
    //   path    : 'equities',
    // })
    // this.props.modify({
    //   id   : '5e8faa5ac12feb126c5d74e0',
    //   name : 'test mod',
    // })
    // this.props.activate({ id: '5e68c787895e030ca05923df' })
    // this.props.deactivate({ id: '5e68c787895e030ca05923df' })
    // this.props.remove({ id: '5e8faa5ac12feb126c5d74e0' })
    // this.props.fetch({ id: '5e8a345aba27b53e7cb62869' })
    /* ---------------------------- // NOTE: Company ---------------------------- */
    // this.props.fetch()
    // this.props.fetch({ id: '5e68c775895e030ca05923dd' })
    // this.props.create({
    //   name : 'C',
    // })
    // this.props.modify({
    //   id   : '5e8fa248355464231c4bff9e',
    //   name : 'C MOD',
    // })
    // this.props.activate({ id: '5e8e7b80a594d80130fbd748' })
    // this.props.deactivate({ id: '5e8e7b80a594d80130fbd748' })
    // this.props.remove({ id: '5e8fa248355464231c4bff9e' })
    // this.props.fetch({ id: '5e8fa248355464231c4bff9e' })
  }

  render() {
    return <Fragment>> api test</Fragment>
  }
}

const mapStateToProps = state => ({
  // sidebar_collapse : state.main.sidebar_collapse,
  // account          : state.account.account,
  // journal          : state.journal,
  // company          : state.main.company,
})

const { fetch, create, modify, activate, deactivate } = journalAction.send
// const { remove } = journalAction.send

const mapDispatchToProps = dispatch => ({
  fetch      : payload => dispatch(fetch(payload)),
  create     : payload => dispatch(create(payload)),
  modify     : payload => dispatch(modify(payload)),
  activate   : payload => dispatch(activate(payload)),
  deactivate : payload => dispatch(deactivate(payload)),
  // remove     : payload => dispatch(remove(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Api)
