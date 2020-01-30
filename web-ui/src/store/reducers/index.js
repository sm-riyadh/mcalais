import { combineReducers } from 'redux'

import journal from './journal'
import ledger from './ledger'

const rootReducer = combineReducers({
  journal: journal,
  ledger: ledger,
})

export default rootReducer
