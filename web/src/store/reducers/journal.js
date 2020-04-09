import moment from 'moment'
import { JOURNAL } from '..'

const initialState = {
  journal : '',
  input   : {
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
  status  : {
    success : false,
    request : false,
    failed  : false,
    message : '',
  },
}

const journal = (state = initialState, { type, payload }) => {
  switch (type) {
    // case JOURNAL.REPLACE._: {
    //   const newState = { ...state }
    //   newState.journal = payload
    //   return newState
    // }
    // case JOURNAL.ADD.TOP: {
    //   console.log('journal -> payload', payload)
    //   const newState = { ...state }
    //   newState.journal = [ payload, ...newState.journal ]
    //   return newState
    // }
    // case JOURNAL.ADD.BOTTOM: {
    //   const newState = { ...state }
    //   newState.journal = [ ...newState.journal, payload ]
    //   return newState
    // }
    // case JOURNAL.UPDATE.INPUT: {
    //   const newState = { ...state }
    //   newState.input[payload.name] = payload.value
    //   return newState
    // }
    // case JOURNAL.STATUS.SUCCESS: {
    //   const newState = { ...state }
    //   newState.status.request = false
    //   newState.status.success = true
    //   return newState
    // }
    // case JOURNAL.STATUS.REQUEST: {
    //   const newState = { ...state }
    //   newState.status.success = false
    //   newState.status.failed = false
    //   newState.status.request = true
    //   return newState
    // }
    // case JOURNAL.STATUS.FAILED: {
    //   const newState = { ...state }
    //   newState.status.request = false
    //   newState.status.failed = true
    //   newState.status.message = payload
    //   return newState
    // }
    default:
      return state
  }
}

export default journal
