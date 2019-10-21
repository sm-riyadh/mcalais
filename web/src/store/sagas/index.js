import { all } from 'redux-saga/effects'

import journalSaga from './journalsSaga'

export default function* rootSaga() {
	yield all([ journalSaga() ])
}
