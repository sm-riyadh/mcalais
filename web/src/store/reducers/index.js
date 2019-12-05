import { combineReducers } from 'redux'

import account from './account'
import journal from './journal'
import ledger from './ledger'

const rootReducer = combineReducers({
  account: account,
  journal: journal,
  ledger: ledger,
})

export default rootReducer
