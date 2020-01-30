import { JOURNAL } from '..'

const initialState = {
  journal: [],
}

const journal = (state = initialState, { type, payload }) => {
  switch (type) {
    case JOURNAL.REPLACE._: {
      const newState = { ...state }
      newState.journal = payload
      return newState
    }
    case JOURNAL.ADD._: {
      const newState = { ...state }
      newState.journal = [...newState.journal, ...payload]
      return newState
    }
    default:
      return state
  }
}

export default journal
