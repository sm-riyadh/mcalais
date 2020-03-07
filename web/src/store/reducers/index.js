import { combineReducers } from 'redux'

import main from './main'
import journal from './journal'
import coa from './coa'
import company from './company'
// import tree from './tree'

const rootReducer = combineReducers({ main, journal, coa, company,
  // tree
 })

export default rootReducer
