import { COMPANY } from '..'

const initialState = {
  company: [],
}

const company = (state = initialState, { type, payload }) => {
  switch (type) {
    case COMPANY.REPLACE: {
      const newState = { ...state }
      newState.company = payload
      return newState
    }
    default:
      return state
  }
}

export default company
