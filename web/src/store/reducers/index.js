import { combineReducers } from 'redux'

import main from './main'
import journal from './journal'
import coa from './coa'
import company from './company'

const rootReducer = combineReducers({ main, journal, coa, company })

export default rootReducer
