import { JOURNAL } from '..'

const initialState = {
  journal: [],
  account_list: [],
}

const journal = (state = initialState, { type, payload }) => {
  switch (type) {
    case JOURNAL.SAVE.INIT: {
      const newState = { ...state }
      newState.journal = payload.journal
      newState.account_list = payload.account_list
      return newState
    }
    case JOURNAL.SAVE.MORE: {
      console.log(payload)

      const newState = { ...state }
      newState.journal = [...newState.journal, ...payload]
      return newState
    }
    case JOURNAL.SAVE.ACCOUNT: {
      const newState = { ...state }
      newState.journal = payload.journal
      return newState
    }
    default:
      return state
  }
}

export default journal
