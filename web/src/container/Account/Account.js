import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import {
  // Modal,
  Container,
  Card,
  Text,
  Placeholder,
} from '../../component'
import { ActivityBar } from '../../component/layout'

import { fetchAccount, createAccount, removeAccount } from '../../store/actions'
import Api from '../../store/sagas/api/tree'

import AccountTableRows from './components/AccountTableRows'
// import AccountManagerLegacy from './components/AccountManagerLegacy'
import AccountModal from './components/AccountModal'
import FolderModal from './components/FolderModal'

const TreeViewer = ({ branch, accountType, creationModal, removeAccount, removeFolder, nested = [], account }) =>
  branch.map(({ type, location, path, name, children }, index) => {
    const account = account.length != 0 && account.filter(e => e.name === name && e.type === accountType)[0]

    return (
      <Fragment key={index}>
        <tr>
          <td
            style={
              type === 'folder' ? (
                {
                  backgroundColor : '#f7f7f7',
                }
              ) : null
            }
          >
            {nested.length != 0 && (
              <span
                style={{
                  borderRight : '0.1rem solid #aaa',
                  marginRight : '0.5rem',
                  padding     : '0.8rem 0',
                }}
              >
                {nested.map(n => (
                  <span
                    style={{
                      borderLeft : '0.1rem solid #ddd',
                      padding    : '0.8rem 0',
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                ))}
              </span>
            )}
            {type === 'folder' && <i className='material-icons p-right-1'>folder</i>}
            {type === 'account' && <i className='material-icons p-right-1'>money</i>}
            {name}
          </td>
          {type == 'account' && (
            <td
              style={{
                paddingTop    : '0',
                paddingBottom : '0',
              }}
              className='txtRight'
            >
              {account ? account.balance : '0'}
              {account && (
                <button className='btn btn-small btn-rounded grey' onClick={() => removeAccount(accountType, account)}>
                  <i className='material-icons p-right-1'>{account.balance === 0 ? 'delete' : 'lock'}</i>
                </button>
              )}
            </td>
          )}
          {type == 'folder' && (
            <td
              style={
                type === 'folder' ? (
                  {
                    backgroundColor : '#f7f7f7',
                    paddingTop      : '0',
                    paddingBottom   : '0',
                  }
                ) : (
                  {
                    paddingTop    : '0',
                    paddingBottom : '0',
                  }
                )
              }
              className='txtRight'
            >
              <Fragment>
                <button
                  className='btn btn-small btn-rounded grey'
                  onClick={() => creationModal('folder', accountType, location, path)}
                >
                  <i className='material-icons p-right-1'>create_new_folder</i>
                </button>
                &nbsp;
                <button
                  className='btn btn-small btn-rounded grey'
                  onClick={() => creationModal('account', accountType, location, path)}
                >
                  <i className='material-icons p-right-1'>fiber_new</i>
                </button>
                <button
                  className='btn btn-small btn-rounded grey'
                  onClick={() => removeFolder(accountType, name, location)}
                >
                  <i className='material-icons p-right-1'>delete</i>
                </button>
              </Fragment>
            </td>
          )}
        </tr>
        {type == 'folder' && (
          <TreeViewer
            accountType={accountType}
            branch={children}
            creationModal={creationModal}
            removeAccount={removeAccount}
            removeFolder={removeFolder}
            account={account}
            nested={[ ...nested, null ]}
          />
        )}
      </Fragment>
    )
  })

export class Account extends Component {
  async componentDidMount() {
    this.props.fetchAccount({ company: this.props.company })
    const tree = await Api.fetchTree({ company: this.props.company })
    tree && this.setState({ tree: tree.data })
  }

  state = {
    modify_account : false,
    filter         : '',
    location       : '',
    folder         : '',
    account        : '',
    path           : '',
    accountType    : '',
    modal_account  : false,
    modal_folder   : false,
    tree           : {
      assets      : '',
      liabilities : '',
      equities    : '',
      expenses    : '',
      incomes     : '',
    },
  }
  changeHandler = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }
  toggleModal = (name, action) => this.setState({ [name]: action })

  addFolder = () => {
    let tree = { ...this.state.tree }
    let selectedBranch = tree[this.state.accountType]

    this.state.location.length !== 0 &&
      this.state.location.map(
        depth =>
          selectedBranch.children
            ? (selectedBranch = selectedBranch.children[depth])
            : (selectedBranch = selectedBranch[depth])
      )

    if (this.state.location.length !== 0) {
      selectedBranch.children = [
        ...selectedBranch.children,
        {
          type     : 'folder',
          path     : [ ...this.state.path, selectedBranch.name.toLowerCase() ],
          location : [ ...this.state.location, selectedBranch.children.length ],
          name     : this.state.folder,
          children : [],
        },
      ]
    } else {
      selectedBranch = [
        ...selectedBranch,
        {
          type     : 'folder',
          path     : [ ...this.state.path ],
          location : [ selectedBranch.length ],
          name     : this.state.folder,
          children : [],
        },
      ]

      tree[this.state.accountType] = selectedBranch
    }

    this.setState({ tree, folder: '' }, () => Api.sendTree({ company: this.props.company, tree }))
  }
  addAccount = ({ name }) => {
    let tree = { ...this.state.tree }
    let selectedBranch = tree[this.state.accountType]

    this.state.location.length !== 0 &&
      this.state.location.map(
        depth =>
          selectedBranch.children
            ? (selectedBranch = selectedBranch.children[depth])
            : (selectedBranch = selectedBranch[depth])
      )

    if (this.state.location.length !== 0) {
      selectedBranch.children = [
        ...selectedBranch.children,
        {
          type     : 'account',
          path     : [ ...this.state.path, selectedBranch.name.toLowerCase() ],
          location : [ ...this.state.location, selectedBranch.children.length ],
          name     : this.state.account,
          children : [],
        },
      ]
    } else {
      selectedBranch = [
        ...selectedBranch,
        {
          type     : 'account',
          path     : [ ...this.state.path ],
          location : [ selectedBranch.length ],
          name     : this.state.account,
          children : [],
        },
      ]

      tree[this.state.accountType] = selectedBranch
    }

    this.setState({ tree, account: '' }, () => {
      this.props.createAccount({
        company : this.props.company,
        type    : this.state.accountType,
        name,
        path    : this.state.path,
      })
      Api.sendTree({ company: this.props.company, tree })
    })
  }
  removeAccount = (accountType, { code }) => {
    let tree = { ...this.state.tree }
    let selectedBranch = tree[accountType]

    this.state.location.length !== 0 &&
      this.state.location.map(
        depth =>
          selectedBranch.children
            ? (selectedBranch = selectedBranch.children[depth])
            : (selectedBranch = selectedBranch[depth])
      )

    const account = this.props.account[accountType] && this.props.account[accountType].filter(e => e.code === code)[0]
    selectedBranch = selectedBranch.filter(({ type, name }) => type === 'account' && name !== account.name)

    if (this.state.location.length !== 0) {
      selectedBranch.children = [
        ...selectedBranch.children,
        {
          type     : 'folder',
          path     : [ ...this.state.path, selectedBranch.name.toLowerCase() ],
          location : [ ...this.state.location, selectedBranch.children.length ],
          name     : this.state.folder,
          children : [],
        },
      ]
    } else {
      selectedBranch = [
        ...selectedBranch,
        {
          type     : 'folder',
          path     : [ ...this.state.path ],
          location : [ selectedBranch.length ],
          name     : this.state.folder,
          children : [],
        },
      ]

      tree[this.state.accountType] = selectedBranch
    }

    this.setState({ tree }, async () => {
      this.props.removeAccount({
        company : this.props.company,
        code,
      })
      await Api.fetchTree({ company: this.props.company })
    })
  }
  removeFolder = (accountType, folderName, location) => {
    let tree = { ...this.state.tree }
    let selectedBranch = tree[accountType]

    const prevLocation = [ ...location ]

    prevLocation.splice(prevLocation.length - 1, 1)

    prevLocation.length !== 0 &&
      prevLocation.map(depth => selectedBranch.children && (selectedBranch = selectedBranch[depth]))

    let folder = selectedBranch.children.filter(({ type, name }) => type === 'folder' && name === folderName)[0]

    console.log('removeFolder -> folder', folder)
    // if (folder.children.length === 0) {
    //   if (prevLocation.length !== 0) {
    //     console.log(selectedBranch)
    //     selectedBranch.children = selectedBranch.filter(({ type, name }) => type === 'folder' && name !== folderName)
    //   } else {
    //     selectedBranch.splice(location[0], 1)
    //   }
    // }

    // this.setState({ tree }, async () => console.log(await Api.sendTree({ company: this.props.company, tree })))
  }
  creationModal = (type, accountType, location, path) => {
    this.setState({ accountType, location, path }, this.toggleModal(`modal_${type}`, true))
  }

  render() {
    return (
      <Fragment>
        {this.props.account && !this.props.status.failed ? (
          <Container vertical className='scrollable p-hor-8 p-top-5'>
            <Container className='flex-pos-between p-hor-4 p-bottom-4'>
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
            />
          </Container>
        ) : this.props.status.request ? (
          <Placeholder type='table' />
        ) : (
          <b style={{ padding: '10rem', color: '#dd3838' }}>{this.props.status.message}</b>
        )}
        <ActivityBar>
          {this.props.status.success ? (
            <Fragment>
              <section>
                <div className='widget-header'>
                  <i className='material-icons p-right'>filter</i> Filter
                </div>
              </section>
            </Fragment>
          ) : this.props.status.request ? (
            <Placeholder type='table' />
          ) : (
            <b style={{ padding: '10rem', color: '#dd3838' }}>{this.props.status.message}</b>
          )}
        </ActivityBar>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  company : state.main.company,
  status  : state.account.status,
  account : state.account.account,
})
const mapDispatchToProps = dispatch => ({
  fetchAccount  : payload => dispatch(fetchAccount(payload)),
  removeAccount : payload => dispatch(removeAccount(payload)),
  createAccount : payload => dispatch(createAccount(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)
