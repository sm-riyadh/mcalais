import { all } from 'redux-saga/effects'

import chartOfAccountSaga from './chartOfAccountSaga'
import ledgerSaga from './ledgerSaga'
import journalSaga from './journalSaga'

export default function* rootSaga() {
	yield all([ chartOfAccountSaga(), ledgerSaga(), journalSaga() ])
}
