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
    //   case COMPANY.REPLACE: {
    //     const newState = { ...state }
    //     newState.company = payload
    //     return newState
    //   }
    //   case COMPANY.STATUS.SUCCESS: {
    //     const newState = { ...state }
    //     newState.status.request = false
    //     newState.status.success = true
    //     return newState
    //   }
    //   case COMPANY.STATUS.REQUEST: {
    //     const newState = { ...state }
    //     newState.status.success = false
    //     newState.status.failed = false
    //     newState.status.request = true
    //     return newState
    //   }
    //   case COMPANY.STATUS.FAILED: {
    //     const newState = { ...state }
    //     newState.status.request = false
    //     newState.status.failed = true
    //     newState.status.message = payload
    //     return newState
    //   }
    default:
      return state
  }
}

export default company
