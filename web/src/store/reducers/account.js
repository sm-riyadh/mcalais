import { ACCOUNT } from '..'

const initialState = {
  account      : {
    assets      : '',
    liabilities : '',
    equities    : '',
    expenses    : '',
    incomes     : '',

    balance     : {
      assets      : '',
      liabilities : '',
      equities    : '',
      expenses    : '',
      incomes     : '',
    },
  },
  account_list : '',
  status       : {
    success : false,
    request : false,
    failed  : false,
    message : '',
  },
}

const account = (state = initialState, { type, payload }) => {
  switch (type) {
    // case ACCOUNT.REPLACE._: {
    //   const newState = { ...state }
    //   newState.account = payload
    //   return newState
    // }
    // case ACCOUNT.REPLACE.LIST: {
    //   const newState = { ...state }
    //   newState.account_list = payload
    //   return newState
    // }
    // case ACCOUNT.STATUS.SUCCESS: {
    //   const newState = { ...state }
    //   newState.status.request = false
    //   newState.status.success = true
    //   return newState
    // }
    // case ACCOUNT.STATUS.REQUEST: {
    //   const newState = { ...state }
    //   newState.status.success = false
    //   newState.status.failed = false
    //   newState.status.request = true
    //   return newState
    // }
    // case ACCOUNT.STATUS.FAILED: {
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

export default account
