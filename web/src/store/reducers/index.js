import { combineReducers } from 'redux'

import chartOfAccount from './chartOfAccount'
import journal from './journal'
import ledger from './ledger'

const rootReducer = combineReducers({
	chart_of_account: chartOfAccount,
	journal: journal,
	ledger: ledger,
})

export default rootReducer
