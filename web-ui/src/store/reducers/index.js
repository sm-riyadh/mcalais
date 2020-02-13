import { combineReducers } from 'redux'

import main from './main'
import journal from './journal'
import coa from './coa'

const rootReducer = combineReducers({ main, journal, coa })

export default rootReducer
