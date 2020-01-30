import { call, put, takeLatest } from 'redux-saga/effects'
import API from './api/journal'

import { JOURNAL } from '../index'
import { saveJournal, saveJournalMore } from '../actions'

function* HandleFetchJournal({ payload }) {
  try {
    const journal = yield call(API.fetchJournal, [payload])
    yield put(saveJournal(journal))
  } catch (err) {
    yield put({ type: 'JOURNAL.SAVE', message: err.message })
  }
}
function* HandleFetchJournalMore({ payload }) {
  try {
    const journal = yield call(API.fetchJournal, [payload])
    yield put(saveJournalMore(journal))
  } catch (err) {
    yield put({ type: 'JOURNAL.SAVE', message: err.message })
  }
}

function* watchJournal() {
  yield takeLatest(JOURNAL.FETCH._, HandleFetchJournal)
  yield takeLatest(JOURNAL.FETCH.MORE, HandleFetchJournalMore)
}

export default watchJournal
