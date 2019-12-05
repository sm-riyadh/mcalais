import { ACCOUNT } from '..'

const initialState = []

const account = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT.SAVE:
      return action.data
    case ACCOUNT.NEW_SAVE:
      const newState = [...state]
      newState.filter(
        e => e.code === action.data.destination
      )[0].debit += +action.data.amount
      newState.filter(
        e => e.code === action.data.destination
      )[0].balance -= +action.data.amount
      newState.filter(e => e.code === action.data.source)[0].credit += +action
        .data.amount
      newState.filter(e => e.code === action.data.source)[0].balance -= +action
        .data.amount

      return newState
    default:
      return state
  }
}

export default account
