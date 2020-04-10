import moment from 'moment'
import { JOURNAL } from '..'

const initialState = {
  journal_list : '',
  input        : {
    date          : moment(),
    debit         : '',
    debit_note    : '',
    credit        : '',
    credit_note   : '',
    description   : '',
    amount        : '',
    comment       : '',
    shadowEntries : [],
  },
  status       : {
    success : false,
    request : false,
    failed  : false,
    message : '',
  },
}

const journal = (state = initialState, { type, payload }) => {
  switch (type) {
    case JOURNAL.SAVE.REPLACE: {
      const newState = { ...state }
      newState[payload.key] = payload.data
      return newState
    }
    case JOURNAL.SAVE.ADDTOP: {
      const newState = { ...state }
      newState[payload.key] = [ payload.data, ...newState[payload.key] ]

      return newState
    }
    case JOURNAL.SAVE.ADDBOTTOM: {
      const newState = { ...state }
      newState[payload.key] = [ ...newState[payload.key], payload.data ]

      return newState
    }
    case JOURNAL.SAVE.MODIFY: {
      const newState = { ...state }
      let toModify
      newState[payload.key].find((e, index) => e.id === payload.id && (toModify = index))

      newState[payload.key][toModify] = payload.data

      return newState
    }
    case JOURNAL.SAVE.ACTIVATE: {
      const newState = { ...state }
      let toModify = newState[payload.key].filter(e => e.id === payload.data.id)[0]
      toModify.isDisabled = false

      return newState
    }
    case JOURNAL.SAVE.DEACTIVATE: {
      const newState = { ...state }
      let toModify = newState[payload.key].filter(e => e.id === payload.data.id)[0]
      toModify.isDisabled = true

      return newState
    }
    case JOURNAL.STATUS.SUCCESS: {
      const newState = { ...state }
      newState.status.request = false
      newState.status.success = true

      return newState
    }
    case JOURNAL.STATUS.REQUEST: {
      const newState = { ...state }
      newState.status.success = false
      newState.status.failed = false
      newState.status.request = true

      return newState
    }
    case JOURNAL.STATUS.FAILED: {
      const newState = { ...state }
      newState.status.request = false
      newState.status.failed = true
      newState.status.message = payload

      return newState
    }
    default:
      return state
  }
}

export default journal
