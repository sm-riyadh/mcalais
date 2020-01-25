import { call, put, takeLatest } from 'redux-saga/effects'

import { JOURNAL } from '../index'
import Api from './api/journal'
import { saveJournal, saveNewJournal } from '../actions'

function* handleJournalFetch(payload) {
  try {
    const journal = yield call(Api.fetchJournal, [payload.data])
    yield put(saveJournal(journal))
  } catch (err) {
    yield put({ type: 'JOURNAL.SAVE', message: err.message })
  }
}
function* handleJournalAdd(payload) {
  try {
    const journal = yield call(Api.createJournal, [payload.data])
    yield put(saveNewJournal(journal))
  } catch (err) {
    yield put({ type: 'JOURNAL.SAVE', message: err.message })
  }
}

function* watchJournal() {
  yield takeLatest(JOURNAL.FETCH, handleJournalFetch)
  yield takeLatest(JOURNAL.NEW, handleJournalAdd)
}

export default watchJournal
