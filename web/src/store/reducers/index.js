import { combineReducers } from 'redux'

import chartOfAccounts from './chartOfAccounts'
import journals from './journals'
import ledgers from './ledgers'

const rootReducer = combineReducers({
	chart_of_accounts: chartOfAccounts,
	journals: journals,
	ledgers: ledgers,
})

export default rootReducer
