import { JOURNAL } from '..'

const initialState = []

const journal = (state = initialState, action) => {
  switch (action.type) {
    case JOURNAL.SAVE:
      return action.data
    case JOURNAL.NEW_SAVE:
      return [
        {
          to: action.data.debit,
          from: action.data.credit,
          amount: +action.data.amount,
        },
        ...state,
      ]
    default:
      return state
  }
}

export default journal
