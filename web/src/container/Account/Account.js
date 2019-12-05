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
  }
  render() {
    return (
      <Fragment>
        <main>
          <section style={{ margin: '10px' }}>
            <h2>Accounts</h2>
            <table border='1' style={{ width: '100%' }}>
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
          </section>
          <hr />
          <section>
            <h2> Add account </h2>
            <form style={{ width: '100%' }} onSubmit={this.HandlerAddAccount}>
              <label>
                Account:{' '}
                <select
                  name='type'
                  onChange={this.HandleChange}
                  value={this.state.catagory}
                >
                  <option value=''>Choose a catagory</option>
                  <option value='asset'>Asset</option>
                  <option value='liability'>Liability</option>
                  <option value='equity'>Equity</option>
                </select>
              </label>
              {/* {this.state.catagory && (
                <label>
                  Stack On:
                  <select
                    name='stackCatagory'
                    onChange={this.OnChange}
                    value={this.state.stack_catagory}
                  >
                    <option value='' disabled>
                      Choose
                    </option>
                    <option disabled> {this.state.stackon_account} </option>
                    <option disabled>----------</option>
                    {this.props.account
                      .filter(e => e.code.slice(0, 1) === '1')
                      .map(({ name, code }, i) => (
                        <option key={i} value={name}>
                          {code}
                        </option>
                      ))}
                  </select>
                </label>
              )} */}
              <br />
              <br />
              Code:{' '}
              <input
                type='number'
                name='code'
                onChange={this.HandleChange}
                value={this.state.code}
              />
              <br />
              <br />
              Name:{' '}
              <input
                type='text'
                name='name'
                onChange={this.HandleChange}
                value={this.state.name}
              />
              <br />
              <br />
              <input type='submit' value='Add Account' />
            </form>
          </section>
        </main>
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
