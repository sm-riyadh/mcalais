import { LEDGER } from '..'

const initialState = []

const ledger = (state = initialState, action) => {
  switch (action.type) {
    case LEDGER.SAVE:
      return action.data
    case LEDGER.NEW_SAVE:
      const newState = [...state]
      newState
        .filter(e => e.code === action.data.destination)[0]
        .transactions.unshift({
          journalEntry:
            state.filter(e => e.code === action.data.destination)[0]
              .transactions.length + 1,
          date: new Date().getTime(),
          particular: action.data.source,
          debit: +action.data.amount,
          credit: null,
        })
      newState.filter(
        e => e.code === action.data.destination
      )[0].debit += +action.data.amount

      newState
        .filter(e => e.code === action.data.source)[0]
        .transactions.unshift({
          journalEntry:
            state.filter(e => e.code === action.data.source)[0].transactions
              .length + 1,
          date: new Date().getTime(),
          particular: action.data.destination,
          debit: null,
          credit: +action.data.amount,
        })
      newState.filter(e => e.code === action.data.source)[0].credit += +action
        .data.amount

      return newState
    default:
      return state
  }
}

export default ledger
