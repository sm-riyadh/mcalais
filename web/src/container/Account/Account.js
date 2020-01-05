import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { fetchAccount, addAccount } from '../../store/actions'

class App extends Component {
  componentDidMount() {
    this.props.fetchAccount()
  }
  state = {
    name: '',
    code: '',
    type: '',
  }
  HandleChange = e => {
    const state = { ...this.state }
    state[e.target.name] = e.target.value
    this.setState(state)
  }
  HandleClear = e => {
    const state = {
      name: '',
      code: '',
      type: '',
    }

    this.setState(state)
  }
  HandlerAddAccount = e => {
    e.preventDefault()

    this.props.addAccount({
      name: this.state.name,
      code: this.state.code,
      type: this.state.type,
    })

    this.HandleClear()
    this.typeSelect.focus()
  }
  render() {
    return (
      <Fragment>
        <section className='container-scrollable'>
          <div className='container-card'>
            <h2>Accounts</h2>
            <table
              className='uk-table uk-table-divider uk-table-striped uk-table-hover uk-table-small uk-table-justify  uk-table-middle'
              style={{ width: '100%' }}
            >
              <thead>
                <tr>
                  <th> Code </th>
                  <th> Name </th>
                  <th> Balance </th>
                </tr>
              </thead>
              <tbody>
                {this.props.account.map(({ name, code, balance }, i) => (
                  <tr key={i}>
                    <td>{code}</td>
                    <td>{name}</td>
                    <td>{balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section
          className='uk-container sidebar'
          style={{ paddingTop: '3rem' }}
        >
          <h2> Add account </h2>
          <hr />
          <form style={{ width: '100%' }} onSubmit={this.HandlerAddAccount}>
            <label>
              Account
              <select
                name='type'
                ref={select => {
                  this.typeSelect = select
                }}
                className='uk-select'
                onChange={this.HandleChange}
                value={this.state.catagory}
              >
                <option value=''>Choose a catagory</option>
                <option value='asset'>Asset</option>
                <option value='liability'>Liability</option>
                <option value='equity'>Equity</option>
              </select>
            </label>
            <br />
            <br />
            Code
            <input
              type='number'
              name='code'
              className='uk-input'
              onChange={this.HandleChange}
              value={this.state.code}
            />
            <br />
            <br />
            Name
            <input
              type='text'
              className='uk-input'
              name='name'
              onChange={this.HandleChange}
              value={this.state.name}
            />
            <br />
            <br />
            <input
              className='uk-button uk-button-primary'
              type='submit'
              value='Add Account'
            />
          </form>
        </section>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  account: state.account,
  journal: state.Journal,
})
const mapDispatchToProps = dispatch => ({
  fetchAccount: () => dispatch(fetchAccount()),
  addAccount: payload => dispatch(addAccount(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
