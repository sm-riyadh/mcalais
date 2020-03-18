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

import { fetchCoa, sendCoa } from '../../store/actions'
import API from '../../store/sagas/api/tree'

import CoaTableRows from './components/CoaTableRows'
// import CoaManagerLegacy from './components/CoaManagerLegacy'
import AccountModal from './components/AccountModal'
import FolderModal from './components/FolderModal'

const TreeViewer = ({ branch, accountType, creationModal, nested = [], coa }) =>
  branch.map(({ type, location, path, name, children }, index) => {
    const account = coa.length != 0 && coa.filter(e => e.name === name && e.type === accountType)[0]

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
              </Fragment>
            </td>
          )}
        </tr>
        {type == 'folder' && (
          <TreeViewer
            accountType={accountType}
            branch={children}
            creationModal={creationModal}
            coa={coa}
            nested={[ ...nested, null ]}
          />
        )}
      </Fragment>
    )
  })

export class Coa extends Component {
  async componentDidMount() {
    this.props.fetchCoa({ company: this.props.company })
    const tree = await API.fetchTree({ company: this.props.company })
    tree && this.setState({ tree })
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
      assets      : [],
      liabilities : [],
      equities    : [],
      expenses    : [],
      incomes     : [],
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

    this.setState({ tree, folder: '' }, () => API.sendTree({ company: this.props.company, tree }))
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
      this.props.sendCoa({
        company : this.props.company,
        type    : this.state.accountType,
        name,
        path    : this.state.path,
      })
      API.sendTree({ company: this.props.company, tree })
    })
  }
  creationModal = (type, accountType, location, path) => {
    this.setState({ accountType, location, path }, this.toggleModal(`modal_${type}`, true))
  }

  render() {
    return (
      <Fragment>
        {this.props.status.success ? (
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
                  <TreeViewer
                    accountType='assets'
                    branch={this.state.tree.assets}
                    creationModal={this.creationModal}
                    coa={this.props.coa['assets']}
                  />
                  <tr>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <b>Total</b>
                    </td>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <span>৳</span> {this.props.coa.balance && this.props.coa.balance.assets}
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
                  <TreeViewer
                    accountType='liabilities'
                    branch={this.state.tree.liabilities}
                    creationModal={this.creationModal}
                    coa={this.props.coa['liabilities']}
                  />
                  <tr>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <b>Total</b>
                    </td>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <span>৳</span> {this.props.coa.balance && this.props.coa.balance.liabilities}
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
                  <TreeViewer
                    accountType='equities'
                    branch={this.state.tree.equities}
                    creationModal={this.creationModal}
                    coa={this.props.coa['equities']}
                  />
                  <tr>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <b>Total</b>
                    </td>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <span>৳</span> {this.props.coa.balance && this.props.coa.balance.equities}
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
                  <TreeViewer
                    accountType='expenses'
                    branch={this.state.tree.expenses}
                    creationModal={this.creationModal}
                    coa={this.props.coa['expenses']}
                  />
                  <tr>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <b>Total</b>
                    </td>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <span>৳</span> {this.props.coa.balance && this.props.coa.balance.expenses}
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
                  <TreeViewer
                    accountType='incomes'
                    branch={this.state.tree.incomes}
                    creationModal={this.creationModal}
                    coa={this.props.coa['incomes']}
                  />
                  <tr>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <b>Total</b>
                    </td>
                    <td className='txtRight' style={{ backgroundColor: '#eeeeee' }}>
                      <span>৳</span> {this.props.coa.balance && this.props.coa.balance.incomes}
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
  status  : state.coa.status,
  coa     : state.coa.coa,
})
const mapDispatchToProps = dispatch => ({
  fetchCoa : payload => dispatch(fetchCoa(payload)),
  sendCoa  : payload => dispatch(sendCoa(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Coa)
