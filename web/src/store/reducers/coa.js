import { COA } from '..'

const initialState = {
  coa: {
    assets: [],
    liabilities: [],
    equities: [],
    expenses: [],
    incomes: [],
  },
  coa_list: [],
}

const coa = (state = initialState, { type, payload }) => {
  switch (type) {
    case COA.REPLACE._: {
      const newState = { ...state }
      newState.coa = payload
      return newState
    }
    case COA.REPLACE.LIST: {
      const newState = { ...state }
      newState.coa_list = payload
      return newState
    }
    default:
      return state
  }
}

export default coa
