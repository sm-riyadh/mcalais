import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import {
  // Modal,
  Container,
  Card,
  Text,
  Placeholder,
} from '../../component'

import { fetchCoa, sendCoa } from '../../store/actions'

import CoaTableRows from './components/CoaTableRows'
// import CoaManagerLegacy from './components/CoaManagerLegacy'
import CoaManager from './components/CoaManager'

const TreeViewer = ({ branch, creationModal, nested = [], coa }) =>
  branch.map(({ type, code, location, path, name, children }, index) => {
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
              {account.balance}
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
                  onClick={() => creationModal('folder', location, path)}
                >
                  &nbsp;✎ Folder&nbsp;
                </button>
                &nbsp;
                <button
                  style={{ borderRadius: '4px' }}
                  onClick={() => creationModal('account', location, path)}
                >
                  &nbsp;✎ Account&nbsp;
                </button>
              </Fragment>
            </td>
          )}
        </tr>
        {type == 'folder' && (
          <TreeViewer
            branch={children}
            creationModal={creationModal}
            coa={coa}
            nested={[...nested, null]}
          />
        )}
      </Fragment>
    )
  })

export class Coa extends Component {
  componentDidMount() {
    this.props.fetchCoa({ company: this.props.company })
  }

  state = {
    filter: '',
    location: '',
    folder: '',
    account: '',
    path: '',
    modal_coa_manager: false,
    tree: [
      {
        type: 'folder',
        path: ['asset'],
        location: [0],
        name: 'Cash',
        children: [],
      },
      {
        type: 'folder',
        path: ['asset'],
        location: [1],
        name: 'Bank',
        children: [],
      },
      {
        type: 'folder',
        path: ['asset'],
        location: [2],
        name: 'Receivable',
        children: [],
      },
    ],
  }
  changeHandler = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }
  toggleModal = (name, action) => this.setState({ [name]: action })

  addFolder = e => {
    e.preventDefault()

    let selectedBranch = { ...this.state.tree }

    this.state.location.map(depth =>
      selectedBranch.children
        ? (selectedBranch = selectedBranch.children[depth])
        : (selectedBranch = selectedBranch[depth])
    )

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

    this.setState({ selectedBranch, folder: '' })
  }
  addAccount = ({ company, type, name }) => {
    let selectedBranch = { ...this.state.tree }
    this.state.location.map(depth =>
      selectedBranch.children
        ? (selectedBranch = selectedBranch.children[depth])
        : (selectedBranch = selectedBranch[depth])
    )

    selectedBranch.children = [
      ...selectedBranch.children,
      {
        type: 'account',
        path: ['asset', ...this.state.path, selectedBranch.name.toLowerCase()],
        location: [...this.state.location, selectedBranch.children.length],
        code: 100008,
        name: this.state.account,
        children: [],
      },
    ]

    this.setState({ selectedBranch, account: '' }, () =>
      this.props.sendCoa({
        company,
        type,
        name,
        path: this.state.path,
      })
    )
  }
  creationModal = (type, location, path) => {
    if (type == 'folder') this.setState({ location, path })
    else if (type == 'account')
      this.setState(
        { location, path },
        this.toggleModal('modal_coa_manager', true)
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
              this.toggleModal('modal_coa_manager', true)
            }}
          >
            COA MANAGER &nbsp;&nbsp; +
          </button>
        </Container>
        <form onSubmit={e => this.addFolder(e)}>
          <input
            type='text'
            name='folder'
            onChange={e => this.setState({ folder: e.target.value })}
            value={this.state.folder}
          />
          &nbsp;
          <input type='submit' name='folder' value=' Create ' />
        </form>
        <Card className='p-top-5' vertical noPad expand>
          <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
            <Text>Assets</Text>
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
                branch={this.state.tree}
                creationModal={this.creationModal}
                coa={this.props.coa['assets']}
              />
            </tbody>
          </table>
        </Card>
        <Card className='p-top-5' vertical noPad expand>
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
        </Card>

        {/* <CoaManagerLegacy
          isModalOpen={this.state.modal_coa_manager}
          modalClose={() => this.toggleModal('modal_coa_manager', false)}
          sendAccount={this.props.sendCoa}
          company={this.props.company}
        /> */}
        <CoaManager
          isModalOpen={this.state.modal_coa_manager}
          modalClose={() => this.toggleModal('modal_coa_manager', false)}
          addAccount={payload => this.addAccount(payload)}
          type={this.state.type}
          setType={type => this.setState({ type })}
          name={this.state.account}
          setName={name => this.setState({ account: name })}
          company={this.props.company}
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
