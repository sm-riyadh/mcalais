import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { accountAction } from '../../store/actions'

import AccountSettingsModal from './components/AccountSettingsModal'
import AccountCreateModal from './components/AccountCreateModal'

import {
  // Modal,
  Container,
  Card,
  // Text,
  // Placeholder,
} from '../../component'

const TreeViewer = ({
  root,
  base,
  data,
  parentId,
  parent,
  setParent,
  children,
  setChildren,
  setSelectItem,
  toggleModalSettings,
  spacing = 0,
}) =>
  base.map(item => {
    const id = data.find(e => e.id === item).id
    const name = data.find(e => e.id === item).name
    const isFolder = data.find(e => e.id === item).isFolder

    return (
      <Fragment key={id}>
        <tr
          onMouseEnter={() => {
            if (isFolder) {
              setParent(id)
              setChildren('')
            } else {
              setParent(parentId)
              setChildren(id)
            }
          }}
        >
          <td>
            <span>{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'.repeat(spacing)}</span>
            {name}
          </td>
          <td>
            0
            {isFolder &&
            id === parent && (
              <Fragment>
                <button className='btn btn-small btn-rounded grey'>
                  <b> + New </b>
                </button>
                <button className='btn btn-small btn-rounded grey' onClick={() => toggleModalSettings(id)}>
                  <b> Edit </b>
                </button>
              </Fragment>
            )}
            {id === children && (
              <button className='btn btn-small btn-rounded grey' onClick={() => toggleModalSettings(id)}>
                <b> Edit </b>
              </button>
            )}
          </td>
        </tr>
        {root[item] ? (
          <TreeViewer
            root={root}
            base={root[item]}
            data={data}
            spacing={spacing + 1}
            parentId={isFolder ? id : parentId}
            parent={parent}
            children={children}
            setParent={setParent}
            setChildren={setChildren}
            toggleModalSettings={toggleModalSettings}
          />
        ) : (
          () => (spacing = 0)
        )}
      </Fragment>
    )
  })

export class Account extends Component {
  componentDidMount() {}

  state = {
    parent          : '',
    children        : '',
    selected_item   : '',
    selected_folder : '',
    modal_settings  : false,
    modal_new       : false,
    assets          : {
      base                       : [
        '5e8f203f1a53001dec074c9b',
        '5e8f20411a53001dec074c9f',
        '5e8fa248355464231c4bffa1',
        '5e99a6a8f5f0492da8a97fdf',
        '5e9dda7d34a463249c7de96a',
        '5e9ddac034a463249c7de96b',
      ],
      '5e9ddac034a463249c7de96b' : [ '5e9ddade34a463249c7de96c' ],
    },
  }

  render() {
    return (
      <Fragment>
        <Container vertical className='scrollable p-hor-8 p-top-5'>
          <Container className='flex-pos-between p-hor-4 p-bottom-4'>
            <Card className='p-top-5' vertical noPad expand>
              <Container className='card-header flex-pos-between p-vrt-4 p-hor-6'>
                <b>Assets</b>
                {this.state.selected_item}
                <span>
                  <button
                    className='btn btn-small btn-rounded grey'
                    onClick={() => this.setState({ selected_folder: 'base', modal_new: true })}
                  >
                    <b> + New </b>
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
                <tbody
                  onMouseLeave={() => {
                    this.setState({ parent: '' })
                    this.setState({ children: '' })
                  }}
                >
                  {this.props.account.length !== 0 && (
                    <TreeViewer
                      accountType='assets'
                      root={this.state.assets}
                      base={this.state.assets.base}
                      data={this.props.account}
                      parent={this.state.parent}
                      children={this.state.children}
                      setParent={id => this.setState({ parent: id })}
                      setChildren={id => this.setState({ children: id })}
                      setSelectItem={id => this.setState({ selected_item: id })}
                      toggleModalSettings={id => this.setState({ selected_item: id, modal_settings: true })}
                    />
                  )}
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
            {this.state.selected_item && (
              <AccountSettingsModal
                isModalOpen={this.state.modal_settings}
                selectedAccount={this.props.account.find(e => e.id === this.state.selected_item)}
                selectedAccount={this.props.account.find(e => e.id === this.state.selected_item)}
                modifyAccount={this.props.modifyAccount}
                modalClose={() => this.setState({ modal_settings: false })}
                removeAccount={() => this.props.removeAccount({ id: this.state.selected_item })}
                activateAccount={() => this.props.activateAccount({ id: this.state.selected_item })}
                deactivateAccount={() => this.props.deactivateAccount({ id: this.state.selected_item })}
              />
            )}
            {this.state.selected_folder && (
              <AccountCreateModal
                isModalOpen={this.state.modal_new}
                selectedAccount={this.props.account.find(e => e.id === this.state.selected_folder)}
                modalClose={() => this.setState({ modal_new: false })}
                createAccount={this.props.createAccount}
                company='5e8f203e1a53001dec074c9a'
                type='assets'
                path='assets'
              />
            )}
          </Container>
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  account : state.account.account,
  status  : state.account.status,
})

const mapDispatchToProps = dispatch => ({
  createAccount     : payload => dispatch(accountAction.send.create(payload)),
  modifyAccount     : payload => dispatch(accountAction.send.modify(payload)),
  activateAccount   : payload => dispatch(accountAction.send.activate(payload)),
  deactivateAccount : payload => dispatch(accountAction.send.deactivate(payload)),
  removeAccount     : payload => dispatch(accountAction.send.remove(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)
