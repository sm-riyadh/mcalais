import { CATAGORY } from '..'

const initialState = []

const catagory = (state = initialState, action) => {
  switch (action.type) {
    case CATAGORY.SAVE:
      return action.data
    default:
      return state
  }
}

export default catagory
