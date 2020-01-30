import { LEDGER } from '..'

const initialState = {
  ledger_list: [],
}

const ledger = (state = initialState, { type, payload }) => {
  switch (type) {
    case LEDGER.REPLACE.LIST: {
      const newState = { ...state }
      newState.ledger_list = payload
      return newState
    }
    default:
      return state
  }
}

export default ledger
