import { JOURNAL } from '..'

const initialState = []

const journal = (state = initialState, action) => {
  switch (action.type) {
    case JOURNAL.SAVE:
      return action.data
    case JOURNAL.NEW_SAVE: {
      const {
        id,
        date,
        credit,
        debit,
        description,
        amount,
        comment,
      } = action.data
      return [
        {
          id,
          date,
          credit,
          debit,
          description,
          amount,
          comment,
        },
        ...state,
      ]
    }
    default:
      return state
  }
}

export default journal
