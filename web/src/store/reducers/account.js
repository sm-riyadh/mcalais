import { ACCOUNT } from '..'

const initialState = []

const account = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT.SAVE:
      return action.data
    case ACCOUNT.NEW_SAVE:
      const newState = [...state]
      newState.find(e => e.code === action.data.destination).debit += +action
        .data.amount
      newState.find(e => e.code === action.data.destination).balance -= +action
        .data.amount
      newState.find(e => e.code === action.data.source).credit += +action.data
        .amount
      newState.find(e => e.code === action.data.source).balance -= +action.data
        .amount

      return newState
    default:
      return state
  }
}

export default account
