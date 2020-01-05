import { call, put, takeLatest } from 'redux-saga/effects'

import { JOURNAL } from '../index'
import Api from './api/journal'
import { saveJournal, fetchJournal, saveNewJournal } from '../actions'

function* handleJournalFetch() {
  try {
    const journal = yield call(Api.fetchJournal)
    yield put(saveJournal(journal))
  } catch (e) {
    yield put({ type: 'Journal.SAVE', message: e.message })
  }
}
function* handleJournalAdd(payload) {
  try {
    const journal = yield call(Api.createJournal, [payload.data])
    yield put(saveNewJournal(journal))
  } catch (e) {
    yield put({ type: 'Journal.SAVE', message: e.message })
  }
}

function* watchJournal() {
  yield takeLatest(JOURNAL.FETCH, handleJournalFetch)
  yield takeLatest(JOURNAL.NEW, handleJournalAdd)
}

export default watchJournal
