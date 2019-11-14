import { put, takeLatest } from 'redux-saga/effects'

import { JOURNAL } from '../index'
import { saveNewJournal, saveJournal, saveNewLedger, saveNewCoa } from '../actions'

const sudoData = []

function* handleJournalFetch() {
	try {
		// const user = yield call(Api.fetchUser, action.payload.userId);
		yield put(saveJournal(sudoData))
	} catch (e) {
		yield put({ type: 'Journal.SAVE', message: e.message })
	}
}
function* handleJournalAdd(payload) {
	payload = payload.data

	try {
		// const user = yield call(Api.addJournal, action.payload.userId);

		yield put(saveNewJournal(payload))
		yield put(saveNewLedger(payload))
		yield put(saveNewCoa(payload))
	} catch (e) {
		yield put({ type: 'Journal.SAVE', message: e.message })
	}
}

function* watchJournal() {
	yield takeLatest(JOURNAL.FETCH, handleJournalFetch)
	yield takeLatest(JOURNAL.NEW, handleJournalAdd)
}

export default watchJournal
