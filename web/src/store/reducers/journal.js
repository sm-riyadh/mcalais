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
    case JOURNAL.ADD.TOP: {
      const newState = { ...state }
      newState.journal = [...payload, ...newState.journal]
      return newState
    }
    case JOURNAL.ADD.BOTTOM: {
      const newState = { ...state }
      newState.journal = [...newState.journal, ...payload]
      return newState
    }
    default:
      return state
  }
}

export default journal
