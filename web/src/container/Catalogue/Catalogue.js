import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { sumbitChange } from '../../store/actions'

class Catalogue extends Component {
  // componentDidMount() {
  //   this.props.fetchAccount()
  // }
  state = {
    new_catagory: {
      is_visible: false,
      action: '',
      id: '',
      index: '',
      title: '',
    },
    catagory_list: [
      {
        id: 'assets',
        title: 'Assets',

        account_order: [],
        account: {},
        preset: {},
      },
      {
        id: 'liabilities',
        title: 'Liabilities',

        account_order: [],
        account: {},
        preset: {},
      },
      {
        id: 'equities',
        title: 'Equities',

        account_order: [],
        account: {},
        preset: {},
      },
      {
        id: 'expenses',
        title: 'Expenses',

        account_order: [],
        account: {},
        preset: {},
      },
      {
        id: 'incomes',
        title: 'Incomes',

        account_order: [],
        account: {},
        preset: {},
      },
    ],
    change_tree: [],
  }
  onDragEnd = (result, index) => {
    const { destination, source, draggableId } = result

    if (!destination) return
    if (
      destination.draggableId === source.draggableId &&
      destination.index === source.index
    )
      return

    if (source.droppableId === destination.droppableId) {
      const { preset_order: newPresetID } = this.state.catagory_list[
        index
      ].account[source.droppableId]

      newPresetID.splice(source.index, 1)
      newPresetID.splice(destination.index, 0, draggableId)

      const newCatagory = {
        ...this.state.catagory_list[index],
        account: {
          ...this.state.catagory_list[index].account,
          preset_order: newPresetID,
        },
      }
      const newCatagoryList = [...this.state.catagory_list]
      newCatagoryList.splice(index, 1, newCatagory)

      this.setState({
        ...this.state,
        newCatagoryList,
      })
    } else {
      const { preset_order: newSourcePresetID } = this.state.catagory_list[
        index
      ].account[source.droppableId]
      const { preset_order: newDestinationPresetID } = this.state.catagory_list[
        index
      ].account[destination.droppableId]

      newSourcePresetID.splice(source.index, 1)
      newDestinationPresetID.splice(destination.index, 0, draggableId)

      const newSourcePreset = {
        ...this.state.catagory_list[index].account,
        preset_order: newSourcePresetID,
      }
      const newDestinationPreset = {
        ...this.state.catagory_list[index].account,
        preset_order: newDestinationPresetID,
      }

      const newAccount = {
        ...this.state.catagory_list[index].account,
        [newSourcePreset.id]: newSourcePreset,
        [newDestinationPreset.id]: newDestinationPreset,
      }
      const newCatagory = {
        ...this.state.catagory_list[index],
        account: newAccount,
      }
      const newCatagoryList = [...this.state.catagory_list]
      newCatagoryList.splice(index, 1, newCatagory)

      this.setState({
        ...this.state,
        newCatagoryList,
      })
    }
  }
  toggleInput = (action, index, id) => {
    this.setState({
      new_catagory: {
        is_visible: true,
        action: action,
        id: id,
        index: index,
        title: '',
      },
    })
  }
  addCatatory = () => {
    const [action, index, id] = [
      this.state.new_catagory.action,
      this.state.new_catagory.index,
      this.state.new_catagory.id,
    ]

    if (action === 'account') {
      const catagory = this.state.catagory_list[index]

      const newCatagory = {
        ...catagory,

        account: {
          ...catagory.account,

          [`ac_${Object.keys(catagory.account).length + 1}`]: {
            id: `ac_${Object.keys(catagory.account).length + 1}`,
            title: this.state.new_catagory.title,
            preset_order: [],
          },
        },
        account_order: [
          ...catagory.account_order,
          `ac_${Object.keys(catagory.account).length + 1}`,
        ],
      }

      const catagoryList = this.state.catagory_list
      catagoryList.splice(index, 1, newCatagory)

      this.setState({
        ...this.state,
        catagory_list: catagoryList,
        change_tree: [
          ...this.state.change_tree,
          {
            action: 'ADD',
            type: 'account',
            data: {
              ...this.state.change_tree,
              id: `ac_${Object.keys(catagory.account).length + 1}`,
              name: this.state.new_catagory.title,
              catagory_id: catagory.id,
              preset: [],
            },
          },
        ],
      })
    } else {
      const catagory = this.state.catagory_list[index]

      const newAccount = {
        ...catagory.account,

        [id]: {
          ...catagory.account[id],
          preset_order: [
            `ps_${Object.keys(catagory.preset).length + 1}`,
            ...catagory.account[id].preset_order,
          ],
        },
      }
      const newPreset = {
        ...catagory.preset,

        [`ps_${Object.keys(catagory.preset).length + 1}`]: {
          id: `ps_${Object.keys(catagory.preset).length + 1}`,
          title: this.state.new_catagory.title,
        },
      }
      const newCatagory = {
        ...catagory,
        account: newAccount,
        preset: newPreset,
      }

      const catagoryList = this.state.catagory_list
      catagoryList.splice(index, 1, newCatagory)

      this.setState({
        ...this.state,
        catagoryList,
        change_tree: [
          ...this.state.change_tree,
          {
            action: 'ADD',
            type: 'preset',
            data: {
              id: `ps_${Object.keys(catagory.preset).length + 1}1`,
              name: this.state.new_catagory.title,
              catagory_id: catagory.id,
              account_id: id,
            },
          },
        ],
      })
    }

    this.HandleClear()
  }
  HandleInputChange = e => {
    const state = { ...this.state }
    state.new_catagory[e.target.name] = e.target.value
    this.setState(state)
  }
  HandleClear = () => {
    const state = {
      new_catagory: {
        is_visible: false,
        action: '',
        id: '',
        index: '',
        title: '',
      },
    }

    this.setState(state)
  }
  HandleSubmition = (type, { title }) => {}
  Capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

  render() {
    return (
      <Fragment>
        <section className='container-scrollable'>
          <div className='container-card'>
            {this.state.catagory_list.map((catagory, index) => (
              <div key={index} className='draggable container'>
                <span className='section-title-big'>{catagory.title}</span>
                <button
                  style={{ float: 'right' }}
                  onClick={() => this.toggleInput('account', index)}
                >
                  ADD
                </button>
                <DragDropContext
                  onDragEnd={result => this.onDragEnd(result, index)}
                >
                  {catagory.account_order.map((account_id, index) => {
                    const account = catagory.account[account_id]

                    return (
                      <Droppable
                        key={account.id}
                        droppableId={account.id}
                        index={index}
                      >
                        {provided => (
                          <span>
                            <div className='section-title'>
                              {account.title} &nbsp;&nbsp;&nbsp;
                              <button
                                style={{ float: 'right' }}
                                onClick={() =>
                                  this.toggleInput('preset', index, account_id)
                                }
                              >
                                ADD
                              </button>
                            </div>
                            <div>
                              <div
                                className='drag-container'
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                {account.preset_order.map(
                                  (preset_order, index) => {
                                    const preset = catagory.preset[preset_order]

                                    return (
                                      <Draggable
                                        key={preset.id}
                                        draggableId={preset.id}
                                        index={index}
                                      >
                                        {provided => (
                                          <div
                                            className='drag-item'
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            {preset.title}
                                            <b style={{ float: 'right' }}>≡</b>
                                            {provided.placeholder}
                                          </div>
                                        )}
                                      </Draggable>
                                    )
                                  }
                                )}
                              </div>
                            </div>

                            {provided.placeholder}
                          </span>
                        )}
                      </Droppable>
                    )
                  })}
                </DragDropContext>
              </div>
            ))}
          </div>
        </section>
        <section
          className='uk-container sidebar'
          style={{ paddingTop: '3rem' }}
        >
          <h2> Add account </h2>
          <hr />
          {this.state.new_catagory.is_visible && (
            <div>
              <h4>Add {this.Capitalize(this.state.new_catagory.action)}</h4>
              <input
                type='text'
                name='title'
                onChange={this.HandleInputChange}
                value={this.state.new_catagory.title}
              />
              <br />
              <br />
              <button onClick={this.addCatatory}>
                Create {this.Capitalize(this.state.new_catagory.action)}
              </button>
            </div>
          )}
          <br />
          <br />
          <button
            className='uk-button uk-button-primary'
            onClick={() => this.props.sumbitChange(this.state.change_tree)}
          >
            &nbsp;&nbsp;SEND UPDATED CHANGE&nbsp;&nbsp;
          </button>
        </section>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  sumbitChange: payload => dispatch(sumbitChange(payload)),
})

export default connect(null, mapDispatchToProps)(Catalogue)
