import { put, call, takeEvery, select } from 'redux-saga/effects'

import { JOURNAL } from '../index'
import { loadJournals, loadCoa } from '../actions'
// import { fetchImages } from 'api'

export const getPage = state => state.nextPage

export function* handleJournalSend(payload) {
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
	yield takeEvery(JOURNAL.SEND, handleJournalSend)
}
