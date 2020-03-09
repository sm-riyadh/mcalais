import { MAIN } from '..'

const initialState = {
  sidebar_collapse : false,
  company          : 'HQ',
}

const main = (state = initialState, { type, name, payload }) => {
  switch (type) {
    case MAIN.SET: {
      const newState = { ...state }
      newState[name] = payload
      return newState
    }
    default:
      return state
  }
}

export default main
