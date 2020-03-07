import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import {
  // Modal,
  Container,
  Card,
  Text,
  Placeholder,
} from '../../component'

import { fetchCoa, sendCoa, } from '../../store/actions'
import API from '../../store/sagas/api/tree'

import CoaTableRows from './components/CoaTableRows'
// import CoaManagerLegacy from './components/CoaManagerLegacy'
import AccountModal from './components/AccountModal'
import FolderModal from './components/FolderModal'

const TreeViewer = ({ branch, accountType, creationModal, nested = [], coa }) =>
  branch.map(
    ({ type, code = 100003, location, path, name, children }, index) => {
      const account = coa.length != 0 && coa.filter(e => e.code === code)[0]

      return (
        <Fragment key={index}>
          <tr>
            <td
              style={
                type === 'folder'
                  ? {
                      backgroundColor: '#f7f7f7',
                    }
                  : null
              }
            >
              {nested.length != 0 && (
                <span
                  style={{
                    borderRight: '0.1rem solid #aaa',
                    marginRight: '0.5rem',
                    padding: '0.8rem 0',
                  }}
                >
                  {nested.map(n => (
                    <span
                      style={{
                        borderLeft: '0.1rem solid #ddd',
                        padding: '0.8rem 0',
                      }}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  ))}
                </span>
              )}
              {type === 'folder' && '🖿 '}
              {type === 'account' && '💰 '}
              {name}
            </td>
            {type == 'account' && (
              <td
                style={{
                  paddingTop: '0',
                  paddingBottom: '0',
                }}
                className='txtRight'
              >
                {account ? account.balance : '0'}
              </td>
            )}
            {type == 'folder' && (
              <td
                style={
                  type === 'folder'
                    ? {
                        backgroundColor: '#f7f7f7',
                        paddingTop: '0',
                        paddingBottom: '0',
                      }
                    : {
                        paddingTop: '0',
                        paddingBottom: '0',
                      }
                }
                className='txtRight'
              >
                <Fragment>
                  <button
                    style={{ borderRadius: '4px' }}
                    onClick={() =>
                      creationModal('folder', accountType, location, path)
                    }
                  >
                    &nbsp;✎ Folder&nbsp;
                  </button>
                  &nbsp;
                  <button
                    style={{ borderRadius: '4px' }}
                    onClick={() =>
                      creationModal('account', accountType, location, path)
                    }
                  >
                    &nbsp;✎ Account&nbsp;
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
              nested={[...nested, null]}
            />
          )}
        </Fragment>
      )
    }
  )

export class Coa extends Component {
  async componentDidMount() {
    this.props.fetchCoa({ company: this.props.company })
    this.setState({tree: await API.fetchTree({ company: this.props.company })})
  }

  state = {
    filter: '',
    location: '',
    folder: '',
    account: '',
    path: '',
    accountType: '',
    modal_account: false,
    modal_folder: false,
    tree: {
      assets: [],
      liabilities: [],
      equities: [],
      expenses: [],
      incomes: [],
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
      this.state.location.map(depth =>
        selectedBranch.children
          ? (selectedBranch = selectedBranch.children[depth])
          : (selectedBranch = selectedBranch[depth])
      )

    if (this.state.location.length !== 0) {
      selectedBranch.children = [
        ...selectedBranch.children,
        {
          type: 'folder',
          path: [...this.state.path, selectedBranch.name.toLowerCase()],
          location: [...this.state.location, selectedBranch.children.length],
          name: this.state.folder,
          children: [],
        },
      ]
    } else {
      selectedBranch = [
        ...selectedBranch,
        {
          type: 'folder',
          path: [...this.state.path],
          location: [selectedBranch.length],
          name: this.state.folder,
          children: [],
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
      this.state.location.map(depth =>
        selectedBranch.children
          ? (selectedBranch = selectedBranch.children[depth])
          : (selectedBranch = selectedBranch[depth])
      )

    if (this.state.location.length !== 0) {
      selectedBranch.children = [
        ...selectedBranch.children,
        {
          type: 'account',
          path: [...this.state.path, selectedBranch.name.toLowerCase()],
          location: [...this.state.location, selectedBranch.children.length],
          name: this.state.account,
          children: [],
        },
      ]
    } else {
      selectedBranch = [
        ...selectedBranch,
        {
          type: 'account',
          path: [...this.state.path],
          location: [selectedBranch.length],
          name: this.state.account,
          children: [],
        },
      ]

      tree[this.state.accountType] = selectedBranch
    }

    this.setState({ tree, account: '' }, () => {

      this.props.sendCoa({
        company: this.props.company,
        type: this.state.accountType,
        name,
        path: this.state.path,
      })
      API.sendTree({ company: this.props.company, tree })
    })
  }
  creationModal = (type, accountType, location, path) => {
    this.setState(
      { accountType, location, path },
      this.toggleModal(`modal_${type}`, true)
    )
  }

  render() {
    return 1 === 1 ? (
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
              this.toggleModal('modal_account', true)
            }}
          >
            COA MANAGER &nbsp;&nbsp; +
          </button>
        </Container>
        <Card className='p-top-5' vertical noPad expand>
          <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
            <Text>Assets</Text>
            <span>
              <button
                style={{ borderRadius: '4px' }}
                onClick={() =>
                  this.creationModal('folder', 'assets', [], ['assets'])
                }
              >
                &nbsp;✎ Folder&nbsp;
              </button>
              &nbsp;
              <button
                style={{ borderRadius: '4px' }}
                onClick={() =>
                  this.creationModal('account', 'assets', [], ['assets'])
                }
              >
                &nbsp;✎ Account&nbsp;
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
                  <span>৳</span>{' '}
                  {this.props.coa.balance && this.props.coa.balance.assets}
                </td>
              </tr>
            </tbody>
          </table>
          <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
            <Text>Liabilities</Text>
            <span>
              <button
                style={{ borderRadius: '4px' }}
                onClick={() =>
                  this.creationModal(
                    'folder',
                    'liabilities',
                    [],
                    ['liabilities']
                  )
                }
              >
                &nbsp;✎ Folder&nbsp;
              </button>
              &nbsp;
              <button
                style={{ borderRadius: '4px' }}
                onClick={() =>
                  this.creationModal(
                    'account',
                    'liabilities',
                    [],
                    ['liabilities']
                  )
                }
              >
                &nbsp;✎ Account&nbsp;
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
                  <span>৳</span>{' '}
                  {this.props.coa.balance && this.props.coa.balance.liabilities}
                </td>
              </tr>
            </tbody>
          </table>
          <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
            <Text>Equities</Text>
            <span>
              <button
                style={{ borderRadius: '4px' }}
                onClick={() =>
                  this.creationModal('folder', 'equities', [], ['equities'])
                }
              >
                &nbsp;✎ Folder&nbsp;
              </button>
              &nbsp;
              <button
                style={{ borderRadius: '4px' }}
                onClick={() =>
                  this.creationModal('account', 'equities', [], ['equities'])
                }
              >
                &nbsp;✎ Account&nbsp;
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
                  <span>৳</span>{' '}
                  {this.props.coa.balance && this.props.coa.balance.equities}
                </td>
              </tr>
            </tbody>
          </table>
          <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
            <Text>Expenses</Text>
            <span>
              <button
                style={{ borderRadius: '4px' }}
                onClick={() =>
                  this.creationModal('folder', 'expenses', [], ['expenses'])
                }
              >
                &nbsp;✎ Folder&nbsp;
              </button>
              &nbsp;
              <button
                style={{ borderRadius: '4px' }}
                onClick={() =>
                  this.creationModal('account', 'expenses', [], ['expenses'])
                }
              >
                &nbsp;✎ Account&nbsp;
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
                  <span>৳</span>{' '}
                  {this.props.coa.balance && this.props.coa.balance.incomes}
                </td>
              </tr>
            </tbody>
          </table>
          <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
            <Text>Incomes</Text>
            <span>
              <button
                style={{ borderRadius: '4px' }}
                onClick={() =>
                  this.creationModal('folder', 'incomes', [], ['incomes'])
                }
              >
                &nbsp;✎ Folder&nbsp;
              </button>
              &nbsp;
              <button
                style={{ borderRadius: '4px' }}
                onClick={() =>
                  this.creationModal('account', 'incomes', [], ['incomes'])
                }
              >
                &nbsp;✎ Account&nbsp;
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
                  <span>৳</span>{' '}
                  {this.props.coa.balance && this.props.coa.balance.incomes}
                </td>
              </tr>
            </tbody>
          </table>
        </Card>

        {/* <Card className='p-top-5' vertical noPad expand>
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
              <CoaTableRows data={this.props.coa} accountOf={'assets'} />
              <tr>
                <td className='txtRight' colSpan='2'>
                  <b>Total</b>
                </td>
                <td className='txtRight'>
                  <span>৳</span>{' '}
                  {this.props.coa.balance && this.props.coa.balance.assets}
                </td>
              </tr>
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
              <tr>
                <td className='txtRight' colSpan='2'>
                  <b>Total</b>
                </td>
                <td className='txtRight'>
                  <span>৳</span>{' '}
                  {this.props.coa.balance && this.props.coa.balance.liabilities}
                </td>
              </tr>
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
              <tr>
                <td className='txtRight' colSpan='2'>
                  <b>Total</b>
                </td>
                <td className='txtRight'>
                  <span>৳</span>{' '}
                  {this.props.coa.balance && this.props.coa.balance.equities}
                </td>
              </tr>
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
              <tr>
                <td className='txtRight' colSpan='2'>
                  <b>Total</b>
                </td>
                <td className='txtRight'>
                  <span>৳</span>{' '}
                  {this.props.coa.balance && this.props.coa.balance.expenses}
                </td>
              </tr>
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
              <CoaTableRows data={this.props.coa} accountOf={'incomes'} />
              <tr>
                <td className='txtRight' colSpan='2'>
                  <b>Total</b>
                </td>
                <td className='txtRight'>
                  <span>৳</span>{' '}
                  {this.props.coa.balance && this.props.coa.balance.incomes}
                </td>
              </tr>
            </tbody>
          </table>
        </Card> */}

        {/* <CoaManagerLegacy
          isModalOpen={this.state.modal_account}
          modalClose={() => this.toggleModal('modal_account', false)}
          sendAccount={this.props.sendCoa}
          company={this.props.company}
        /> */}
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
