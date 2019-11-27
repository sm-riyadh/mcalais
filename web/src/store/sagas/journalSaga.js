import { call, put, takeLatest } from 'redux-saga/effects'

import { JOURNAL } from '../index'
import Api from './api/journal'
import { saveNewJournal, saveJournal, saveNewLedger, saveNewCoa } from '../actions'

const sudoData = []

function* handleJournalFetch() {
	try {
		const journalData = yield call(Api.fetchJournal)
		yield put(saveJournal(journalData))
	} catch (e) {
		yield put({ type: 'Journal.SAVE', message: e.message })
	}
}
function* handleJournalAdd(payload) {
	payload = payload.data

	try {
		// const user = yield call(Api.addJournal);

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
