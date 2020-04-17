import cloneDeep from 'lodash.clonedeep'

import { COMPANY } from '..'

const initialState = {
  company : [],
  status  : {
    success : false,
    request : false,
    failed  : false,
    message : '',
  },
}

const company = (state = initialState, { type, payload }) => {
  switch (type) {
    case COMPANY.SAVE.REPLACE: {
      const newState = { ...state }
      newState[payload.key] = payload.data
      return newState
    }
    case COMPANY.SAVE.ADDTOP: {
      const newState = { ...state }
      newState[payload.key] = [ payload.data, ...newState[payload.key] ]

      return newState
    }
    case COMPANY.SAVE.MODIFY: {
      const newState = cloneDeep(state)
      let toModify
      newState[payload.key].find((e, index) => e.id === payload.data.id && (toModify = index))

      newState[payload.key][toModify].name = payload.data.name

      return newState
    }
    case COMPANY.SAVE.ACTIVATE: {
      const newState = cloneDeep(state)
      let toModify = newState[payload.key].filter(e => e.id === payload.data.id)[0]
      toModify.isDisabled = false

      return newState
    }
    case COMPANY.SAVE.DEACTIVATE: {
      const newState = cloneDeep(state)
      let toModify = newState[payload.key].filter(e => e.id === payload.data.id)[0]
      toModify.isDisabled = true

      return newState
    }
    case COMPANY.STATUS.SUCCESS: {
      const newState = cloneDeep(state)
      newState.status.request = false
      newState.status.success = true

      return newState
    }
    case COMPANY.STATUS.REQUEST: {
      const newState = cloneDeep(state)
      newState.status.success = false
      newState.status.failed = false
      newState.status.request = true

      return newState
    }
    case COMPANY.STATUS.FAILED: {
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

export default company
