import cloneDeep from 'lodash.clonedeep'

import { ACCOUNT } from '..'

const initialState = {
  account_nonexist : [],
  account          : [],
  balance          : {
    assets      : '',
    liabilities : '',
    equities    : '',
    expenses    : '',
    incomes     : '',
  },
  status           : {
    success : false,
    request : false,
    failed  : false,
    message : '',
  },
}

const account = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACCOUNT.SAVE.REPLACE: {
      const newState = { ...state }
      newState[payload.key] = payload.data
      return newState
    }
    case ACCOUNT.SAVE.ADDTOP: {
      const newState = { ...state }
      newState[payload.key] = [ payload.data, ...newState[payload.key] ]

      return newState
    }
    case ACCOUNT.SAVE.ADDBOTTOM: {
      const newState = { ...state }
      newState[payload.key] = [ ...newState[payload.key], payload.data ]

      return newState
    }
    case ACCOUNT.SAVE.MODIFY: {
      const newState = cloneDeep(state)

      let toModify
      newState[payload.key].find((e, index) => e.id === payload.data.id && (toModify = index))

      newState[payload.key][toModify].name = payload.data.name

      return newState
    }
    case ACCOUNT.SAVE.ACTIVATE: {
      const newState = cloneDeep(state)

      let toModify = newState[payload.key].filter(e => e.id === payload.data.id)[0]
      toModify.isDisabled = false

      return newState
    }
    case ACCOUNT.SAVE.DEACTIVATE: {
      const newState = cloneDeep(state)

      let toModify = newState[payload.key].filter(e => e.id === payload.data.id)[0]
      toModify.isDisabled = true

      return newState
    }
    case ACCOUNT.STATUS.SUCCESS: {
      const newState = cloneDeep(state)

      newState.status.request = false
      newState.status.success = true

      return newState
    }
    case ACCOUNT.STATUS.REQUEST: {
      const newState = cloneDeep(state)

      newState.status.success = false
      newState.status.failed = false
      newState.status.request = true

      return newState
    }
    case ACCOUNT.STATUS.FAILED: {
      const newState = cloneDeep(state)

      newState.status.request = false
      newState.status.failed = true
      newState.status.message = payload

      return newState
    }
    default:
      return state
  }
}

export default account
