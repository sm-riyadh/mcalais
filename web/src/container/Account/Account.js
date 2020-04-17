import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import {
  // Modal,
  Container,
  Card,
  // Text,
  // Placeholder,
} from '../../component'

const Children = ({ root, name, data, spacing = 0 }) =>
  root[name]
    ? root[name].map(item => (
        <Fragment>
          <tr>
            <td>
              <span>{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'.repeat(spacing)}</span>
              <span>{'\u00A0|\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}</span>
              {data.find(e => e.id === item).name}
            </td>
            <td>0</td>
          </tr>
          <Children root={root} name={item} data={data} spacing={spacing++} />
        </Fragment>
      ))
    : null

const TreeViewer = ({ root, data }) =>
  root.base.map(item => (
    <Fragment>
      <tr>
        <td>{data.find(e => e.id === item).name}</td>
        <td>
          0
          <button className='btn btn-small btn-rounded grey'>
            <i className='material-icons p-right-1'>delete</i>
          </button>
        </td>
      </tr>
      <Children root={root} name={item} data={data} />
    </Fragment>
  ))

export class Account extends Component {
  componentDidMount() {}

  state = {
    data   : {
      assets : [
        { id: '5e8f20411a53001dec074c9f', company: '5e8f203e1a53001dec074c9a', name: 'A', type: 'assets' },
        { id: '5e8f203f1a53001dec074c9b', company: '5e8f203e1a53001dec074c9a', name: 'B', type: 'assets' },
        { id: '5e8fa248355464231c4bffa1', company: '5e8f203e1a53001dec074c9a', name: 'C', type: 'assets' },
        { id: '5e8f20411a53001dec074c93', company: '5e8f203e1a53001dec074c9a', name: 'D', type: 'assets' },
        { id: '5e8f203f1a53001dec074c94', company: '5e8f203e1a53001dec074c9a', name: 'AA', type: 'assets' },
        { id: '5e8fa248355464231c4bffa3', company: '5e8f203e1a53001dec074c9a', name: 'BA', type: 'assets' },
        { id: '5e8f20411a53001dec074c9g', company: '5e8f203e1a53001dec074c9a', name: 'CA', type: 'assets' },
        { id: '5e8f203f1a53001dec074c9y', company: '5e8f203e1a53001dec074c9a', name: 'CB', type: 'assets' },
        { id: '5e8fa248355464231c4bffa8', company: '5e8f203e1a53001dec074c9a', name: 'CAA', type: 'assets' },
        { id: '5e8fa248355464231c4bffa9', company: '5e8f203e1a53001dec074c9a', name: 'E', type: 'assets' },
        { id: '5e8fa248355464231c4bfea9', company: '5e8f203e1a53001dec074c9a', name: 'F', type: 'assets' },
      ],
    },
    assets : {
      base                       : [
        '5e8f20411a53001dec074c9f',
        '5e8f203f1a53001dec074c9b',
        '5e8fa248355464231c4bffa1',
        '5e8f20411a53001dec074c93',
      ],
      '5e8f20411a53001dec074c9f' : [ '5e8f203f1a53001dec074c94' ],
      '5e8f203f1a53001dec074c9b' : [ '5e8fa248355464231c4bffa3' ],
      '5e8fa248355464231c4bffa1' : [ '5e8f20411a53001dec074c9g', '5e8f203f1a53001dec074c9y' ],
      '5e8f20411a53001dec074c9g' : [ '5e8fa248355464231c4bffa8' ],
    },
  }

  render() {
    return (
      <Fragment>
        {/* <Tree root={this.state.assets} data={this.state.data.assets} />
        <button
          onClick={() => {
            const newState = { ...this.state }
            newState.assets.base = [ ...newState.assets.base, '5e8fa248355464231c4bffa9' ]
            newState.assets['5e8fa248355464231c4bffa1'] = [
              ...newState.assets['5e8fa248355464231c4bffa1'],
              '5e8fa248355464231c4bfea9',
            ]
            this.setState(newState)
          }}
        >
          DO
        </button> */}
        <Container vertical className='scrollable p-hor-8 p-top-5'>
          <Container className='flex-pos-between p-hor-4 p-bottom-4'>
            <Card className='p-top-5' vertical noPad expand>
              <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
                <b>Assets</b>
                <span>
                  <button
                    className='btn btn-small btn-rounded grey'
                    onClick={() => this.creationModal('folder', 'assets', [], [ 'assets' ])}
                  >
                    <i className='material-icons p-right-1'>create_new_folder</i>
                  </button>
                  &nbsp;
                  <button
                    className='btn btn-small btn-rounded grey'
                    onClick={() => this.creationModal('account', 'assets', [], [ 'assets' ])}
                  >
                    <i className='material-icons p-right-1'>fiber_new</i>
                  </button>
                </span>
              </Container>
              <table className='table-card'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className='txtRight'>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <TreeViewer accountType='assets' root={this.state.assets} data={this.state.data.assets} />
                  <tr>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <b>Total</b>
                    </td>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <span>৳</span> 0
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </Container>
          {/*     <select
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
              <button
                className='btn btn-chip primary'
                onClick={() => {
                  this.setState({ modify_account: !this.state.modify_account })
                }}
              >
                Modify Accounts &nbsp; ✎
              </button>
            </Container>
            <Card className='p-top-5' vertical noPad expand>
              <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
                <Text>Assets</Text>
                <span>
                  <button
                    className='btn btn-small btn-rounded grey'
                    onClick={() => this.creationModal('folder', 'assets', [], [ 'assets' ])}
                  >
                    <i className='material-icons p-right-1'>create_new_folder</i>
                  </button>
                  &nbsp;
                  <button
                    className='btn btn-small btn-rounded grey'
                    onClick={() => this.creationModal('account', 'assets', [], [ 'assets' ])}
                  >
                    <i className='material-icons p-right-1'>fiber_new</i>
                  </button>
                </span>
              </Container>
              <table className='table-card'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className='txtRight'>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.account['assets'] && this.state.tree['assets'] ? (
                    <TreeViewer
                      accountType='assets'
                      branch={this.state.tree.assets}
                      creationModal={this.creationModal}
                      removeAccount={this.removeAccount}
                      removeFolder={this.removeFolder}
                      account={this.props.account['assets']}
                    />
                  ) : (
                    <tr>
                      <td colSpan='2'>loading</td>
                    </tr>
                  )}
                  <tr>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <b>Total</b>
                    </td>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <span>৳</span> {this.props.account.balance && this.props.account.balance.assets}
                    </td>
                  </tr>
                </tbody>
              </table>
              <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
                <Text>Liabilities</Text>
                <span>
                  <button
                    className='btn btn-small btn-rounded grey'
                    onClick={() => this.creationModal('folder', 'liabilities', [], [ 'liabilities' ])}
                  >
                    <i className='material-icons p-right-1'>create_new_folder</i>
                  </button>
                  &nbsp;
                  <button
                    className='btn btn-small btn-rounded grey'
                    onClick={() => this.creationModal('account', 'liabilities', [], [ 'liabilities' ])}
                  >
                    <i className='material-icons p-right-1'>fiber_new</i>
                  </button>
                </span>
              </Container>
              <table className='table-card'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className='txtRight'>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.account['liabilities'] && this.state.tree['liabilities'] ? (
                    <TreeViewer
                      accountType='liabilities'
                      branch={this.state.tree.liabilities}
                      creationModal={this.creationModal}
                      removeAccount={this.removeAccount}
                      removeFolder={this.removeFolder}
                      account={this.props.account['liabilities']}
                    />
                  ) : (
                    <tr>
                      <td colSpan='2'>loading</td>
                    </tr>
                  )}
                  <tr>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <b>Total</b>
                    </td>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <span>৳</span> {this.props.account.balance && this.props.account.balance.liabilities}
                    </td>
                  </tr>
                </tbody>
              </table>
              <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
                <Text>Equities</Text>
                <span>
                  <button
                    className='btn btn-small btn-rounded grey'
                    onClick={() => this.creationModal('folder', 'equities', [], [ 'equities' ])}
                  >
                    <i className='material-icons p-right-1'>create_new_folder</i>
                  </button>
                  &nbsp;
                  <button
                    className='btn btn-small btn-rounded grey'
                    onClick={() => this.creationModal('account', 'equities', [], [ 'equities' ])}
                  >
                    <i className='material-icons p-right-1'>fiber_new</i>
                  </button>
                </span>
              </Container>
              <table className='table-card'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className='txtRight'>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.account['equities'] && this.state.tree['equities'] ? (
                    <TreeViewer
                      accountType='equities'
                      branch={this.state.tree.equities}
                      creationModal={this.creationModal}
                      removeAccount={this.removeAccount}
                      removeFolder={this.removeFolder}
                      account={this.props.account['equities']}
                    />
                  ) : (
                    <tr>
                      <td colSpan='2'>loading</td>
                    </tr>
                  )}
                  <tr>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <b>Total</b>
                    </td>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <span>৳</span> {this.props.account.balance && this.props.account.balance.equities}
                    </td>
                  </tr>
                </tbody>
              </table>
              <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
                <Text>Expenses</Text>
                <span>
                  <button
                    className='btn btn-small btn-rounded grey'
                    onClick={() => this.creationModal('folder', 'expenses', [], [ 'expenses' ])}
                  >
                    <i className='material-icons p-right-1'>create_new_folder</i>
                  </button>
                  &nbsp;
                  <button
                    className='btn btn-small btn-rounded grey'
                    onClick={() => this.creationModal('account', 'expenses', [], [ 'expenses' ])}
                  >
                    <i className='material-icons p-right-1'>fiber_new</i>
                  </button>
                </span>
              </Container>
              <table className='table-card'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className='txtRight'>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.account['expenses'] && this.state.tree['expenses'] ? (
                    <TreeViewer
                      accountType='expenses'
                      branch={this.state.tree.expenses}
                      creationModal={this.creationModal}
                      removeAccount={this.removeAccount}
                      removeFolder={this.removeFolder}
                      account={this.props.account['expenses']}
                    />
                  ) : (
                    <tr>
                      <td colSpan='2'>loading</td>
                    </tr>
                  )}
                  <tr>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <b>Total</b>
                    </td>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <span>৳</span> {this.props.account.balance && this.props.account.balance.expenses}
                    </td>
                  </tr>
                </tbody>
              </table>
              <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
                <Text>Incomes</Text>
                <span>
                  <button
                    className='btn btn-small btn-rounded grey'
                    onClick={() => this.creationModal('folder', 'incomes', [], [ 'incomes' ])}
                  >
                    <i className='material-icons p-right-1'>create_new_folder</i>
                  </button>
                  &nbsp;
                  <button
                    className='btn btn-small btn-rounded grey'
                    onClick={() => this.creationModal('account', 'incomes', [], [ 'incomes' ])}
                  >
                    <i className='material-icons p-right-1'>fiber_new</i>
                  </button>
                </span>
              </Container>
              <table className='table-card'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className='txtRight'>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.account['incomes'] && this.state.tree['incomes'] ? (
                    <TreeViewer
                      accountType='incomes'
                      branch={this.state.tree.incomes}
                      creationModal={this.creationModal}
                      removeAccount={this.removeAccount}
                      removeFolder={this.removeFolder}
                      account={this.props.account['incomes']}
                    />
                  ) : (
                    <tr>
                      <td colSpan='2'>loading</td>
                    </tr>
                  )}
                  <tr>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <b>Total</b>
                    </td>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <span>৳</span> {this.props.account.balance && this.props.account.balance.incomes}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
            <AccountModal
              isModalOpen={this.state.modal_account}
              modalClose={() => this.toggleModal('modal_account', false)}
              addAccount={payload => this.addAccount(payload)}
              name={this.state.account}
              setName={name => this.setState({ account: name })}
            />
            <FolderModal
              isModalOpen={this.state.modal_folder}
              modalClose={() => this.toggleModal('modal_folder', false)}
              addFolder={payload => this.addFolder(payload)}
              name={this.state.folder}
              setName={name => this.setState({ folder: name })}
            /> */}
        </Container>
      </Fragment>
    )
  }
}
const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Account)
