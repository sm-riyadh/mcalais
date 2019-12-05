import { LEDGER } from '..'

const initialState = []

const ledger = (state = initialState, action) => {
  switch (action.type) {
    case LEDGER.SAVE:
      return action.data
    default:
      return state
  }
}

export default ledger
