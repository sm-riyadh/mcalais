import { COA } from '..'

const initialState = {
  coa      : {
    assets      : [],
    liabilities : [],
    equities    : [],
    expenses    : [],
    incomes     : [],

    balance     : {
      assets      : '',
      liabilities : '',
      equities    : '',
      expenses    : '',
      incomes     : '',
    },
  },
  coa_list : [],
  status   : {
    success : false,
    request : false,
    failed  : false,
    message : '',
  },
}

const coa = (state = initialState, { type, payload }) => {
  switch (type) {
    case COA.REPLACE._: {
      const newState = { ...state }
      newState.coa = payload
      return newState
    }
    case COA.REPLACE.LIST: {
      const newState = { ...state }
      newState.coa_list = payload
      return newState
    }
    case COA.STATUS.SUCCESS: {
      const newState = { ...state }
      newState.status.request = false
      newState.status.success = true
      return newState
    }
    case COA.STATUS.REQUEST: {
      const newState = { ...state }
      newState.status.success = false
      newState.status.failed = false
      newState.status.request = true
      return newState
    }
    case COA.STATUS.FAILED: {
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

export default coa
