import { put, call, takeEvery, select } from 'redux-saga/effects'

import { LEDGERS } from './index'
import { loadLedgers, loadJournals, loadCoa } from '../actions'
// import { fetchImages } from 'api'

export const getPage = state => state.nextPage

export function* handleLedgersSend(payload) {
	yield put(loadLedgers(payload.data))
	yield put(loadJournals(payload.data))
	yield put(loadCoa(payload.data))

	// try {
	// 	const page = yield select(getPage)
	// 	const images = yield call(fetchImages, page)
	// } catch (error) {
	// 	yield put(setError(error.toString()))
	// }
}

export default function* watchImagesLoad() {
	yield takeEvery(LEDGERS.SEND, handleLedgersSend)
}
