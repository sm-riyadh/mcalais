import { combineReducers } from 'redux'

// import account from './account'
import journal from './journal'
// import ledger from './ledger'
// import catagory from './catagory'

const rootReducer = combineReducers({
  // account: account,
  journal: journal,
  // ledger: ledger,
  // catagory: catagory,
})

export default rootReducer
