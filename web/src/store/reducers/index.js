import { combineReducers } from 'redux'

import chartOfAccounts from './chartOfAccounts'
import journals from './journals'

const rootReducer = combineReducers({
	chart_of_accounts: chartOfAccounts,
	journals: journals,
})

export default rootReducer
