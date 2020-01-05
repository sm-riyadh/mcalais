import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { fetchAccount, addAccount } from '../../store/actions'

class Catalogue extends Component {
  // componentDidMount() {
  //   this.props.fetchAccount()
  // }
  state = {
    account_order: ['ac_1', 'ac_2', 'ac_3'],
    account: {
      ac_1: {
        id: 'ac_1',
        title: 'Cash',
        preset_id: ['ps_1'],
      },
      ac_2: {
        id: 'ac_2',
        title: 'Bank',
        preset_id: ['ps_2', 'ps_3', 'ps_4', 'ps_5'],
      },
      ac_3: {
        id: 'ac_3',
        title: 'Inventory',
        preset_id: ['ps_6'],
      },
    },
    preset: {
      ps_1: {
        id: 'ps_1',
        title: 'Cash-in-Hand',
      },
      ps_2: {
        id: 'ps_2',
        title: 'SBL',
      },
      ps_3: {
        id: 'ps_3',
        title: 'AB Bank',
      },
      ps_4: {
        id: 'ps_4',
        title: 'Pubali',
      },
      ps_5: {
        id: 'ps_5',
        title: 'Kangali',
      },
      ps_6: {
        id: 'ps_6',
        title: 'Potato',
      },
    },
  }
  onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination) return
    // if (
    //   destination.draggableId === source.draggableId &&
    //   destination.index === source.index
    // )
    //   return

    const { preset_id: newPresetID } = this.state.account[source.droppableId]

    newPresetID.splice(source.index, 1)
    newPresetID.splice(destination.index, 0, draggableId)

    const newPreset = {
      ...this.state.account,
      preset_id: newPresetID,
    }

    this.setState({
      ...this.state,
      account: { ...this.state.account, [newPresetID.id]: newPreset },
    })
  }
  render() {
    return (
      <Fragment>
        <section className='container-scrollable'>
          <div className='container-card'>
            <h2>Accounts</h2>
            <DragDropContext onDragEnd={this.onDragEnd}>
              {this.state.account_order.map((account_id, index) => {
                const account = this.state.account[account_id]

                return (
                  <Droppable
                    key={account.id}
                    droppableId={account.id}
                    index={index}
                  >
                    {provided => (
                      <span>
                        <h4>{account.title}</h4>
                        <div style={{ padding: '2rem 1rem' }}>
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {account.preset_id.map((preset_id, index) => {
                              const preset = this.state.preset[preset_id]

                              return (
                                <Draggable
                                  key={preset.id}
                                  draggableId={preset.id}
                                  index={index}
                                >
                                  {provided => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <b> {preset.title}</b>
                                      {provided.placeholder}
                                    </div>
                                  )}
                                </Draggable>
                              )
                            })}
                          </div>
                        </div>
                      </span>
                    )}
                  </Droppable>
                )
              })}
            </DragDropContext>
            {/* <table
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
                  </tr>
                ))}
              </tbody>
            </table> */}
          </div>
        </section>
        {/* <section
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
        </section> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue)
