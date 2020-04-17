import { combineReducers } from 'redux'

import settings from './settings'
import journal from './journal'
import account from './account'
import company from './company'
// import tree from './tree'

const rootReducer = combineReducers({
  settings,
  journal,
  account,
  company,
  // tree
})

export default rootReducer
