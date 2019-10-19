import { all } from 'redux-saga/effects'

import journalSaga from './journalSaga'

export default function* rootSaga() {
	yield all([ journalSaga() ])
}
