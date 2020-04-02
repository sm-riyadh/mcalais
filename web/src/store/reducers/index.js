import { combineReducers } from 'redux'

import main from './main'
import journal from './journal'
import account from './account'
import company from './company'
// import tree from './tree'

const rootReducer = combineReducers({
  main,
  journal,
  account,
  company,
  // tree
})

export default rootReducer
