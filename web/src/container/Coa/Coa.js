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
import CoaManager from './components/CoaManager'

const TreeViewer = ({ branch, setCurrentBranch }) => (
  <ul>
    {branch.map(({ type, id, location, name, children }) => (
      <Fragment>
        <li>
          {type == 'folder' && '['}
          {name}
          {type == 'folder' && '] '}
          {/* - {id} */}
          &nbsp;
          <button
            style={{ borderRadius: '4px' }}
            onClick={() => setCurrentBranch({ location })}
          >
            &nbsp;+&nbsp;
          </button>
        </li>
        <TreeViewer branch={children} setCurrentBranch={setCurrentBranch} />
      </Fragment>
    ))}
  </ul>
)

export class Coa extends Component {
  componentDidMount() {
    this.props.fetchCoa({ company: this.props.company })
  }

  state = {
    filter: '',
    location: '',
    folder: '',
    modal_coa_manager: false,
    tree: [
      {
        type: 'folder',
        id: 'asset',
        location: [0],
        name: 'Cash',
        children: [],
      },
      {
        type: 'folder',
        id: 'asset',
        location: [1],
        name: 'Bank',
        children: [],
      },
      {
        type: 'folder',
        id: 'asset',
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

    console.log(selectedBranch.children.length)
    selectedBranch.children = [
      ...selectedBranch.children,
      {
        type: 'folder',
        id: `asset/${selectedBranch.name.toLowerCase()}`,
        location: [...this.state.location, selectedBranch.children.length],
        name: this.state.folder,
        children: [],
      },
    ]

    // console.log(this.state.tree[0].children[this.state.location.slice(1)])
    // const newState = { ...this.state }
    // this.state.location.map(
    //   depth => (selectedBranch = selectedBranch[depth].children)
    // )
    // const newTree = [...tree]

    // let currentBranchRef = []
    // let currentBranchChildren = []

    // currentBranch.map(loc => {
    //   currentBranchChildren = [...newTree[loc].children]
    //   currentBranchRef = newTree[loc].children
    // })

    // currentBranchRef = [
    //   currentBranchChildren,
    //   {
    //     type: 'folder',
    //     // id: `asset/${newTree[loc].name.toLowerCase()}`,
    //     id: `test`,
    //     // location: [0, newTree[loc].children.length],
    //     location: [0, 0, 0, 0, 0],
    //     name: folder,
    //     children: [],
    //   },
    // ]

    // setTree(newTree)
    this.setState({ selectedBranch, folder: '' })
  }

  render() {
    return 1 === 1 ? (
      <Container vertical className='scrollable p-hor-8 p-top-5'>
        <Container className='flex-pos-between p-hor-4 p-bottom-4'>
          <div>
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
          </div>
          <button
            className='btn btn-chip primary'
            onClick={() => {
              this.toggleModal('modal_coa_manager', true)
            }}
          >
            COA MANAGER &nbsp;&nbsp; +
          </button>
        </Container>
        <Card className='p-top-5' vertical noPad expand>
          <h1>{this.state.location}</h1>
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
          <TreeViewer
            branch={this.state.tree}
            setCurrentBranch={loc => this.setState(loc)}
          />
          {/* {this.state.tree.map(tree => (
              <Fragment>
                <li>{tree.name}</li>
                <ul>
                  {tree.branch.map(tree => (
                    <li>{tree.name}</li>
                  ))}
                </ul>
              </Fragment>
            ))} */}
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
              <CoaTableRows
                data={this.props.coa}
                accountOf={'assets'}
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
              <CoaTableRows
                data={this.props.coa}
                accountOf={'incomes'}
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
                  {this.props.coa.balance && this.props.coa.balance.incomes}
                </td>
              </tr>
            </tbody>
          </table>

          <CoaManager
            isModalOpen={this.state.modal_coa_manager}
            modalClose={() => this.toggleModal('modal_coa_manager', false)}
            sendAccount={this.props.sendCoa}
            company={this.props.company}
          />
          {/* {this.state.journal_modal && (
            <Modal title='Journal' modalClose={() => this.toggleModal(false)}>
              {this.state.journal_index && (
                <Fragment>
                  <td>
                    <span
                      title={dateFormat(
                        this.props.journal[this.state.journal_index].date,
                        'ddd, dS mmm, yyyy, h:MM:ss TT'
                      )}
                    >
                      {dateFormat(
                        this.props.journal[this.state.journal_index].date,
                        'ddd, dS mmm'
                      )}
                    </span>
                  </td>
                  <td>
                    {this.props.journal[this.state.journal_index].debit.name} -
                    ({this.props.journal[this.state.journal_index].credit.name})
                  </td>
                  <td>
                    {this.props.journal[this.state.journal_index].description}
                  </td>
                  <td className='txtRight' style={{ textAlign: 'right' }}>
                    <span>৳</span>{' '}
                    {fmt.format(
                      this.props.journal[this.state.journal_index].amount,
                      2
                    )}
                  </td>
                  <td>
                    {this.props.journal[this.state.journal_index].comment}
                  </td>
                </Fragment>
              )}
            </Modal>
          )}
        */}
        </Card>
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
