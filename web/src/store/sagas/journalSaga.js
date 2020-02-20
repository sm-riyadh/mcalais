import { call, put, takeLatest } from 'redux-saga/effects'
import API from './api/journal'

import { JOURNAL } from '../index'
import { saveJournal, saveJournalOnBottom, saveJournalOnTop } from '../actions'

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
    yield put(saveJournalOnBottom(journal))
  } catch (err) {
    yield put({ type: 'JOURNAL.SAVE', message: err.message })
  }
}
function* HandleSendJournal({ payload }) {
  try {
    const journal = yield call(API.sendJournal, [payload])
    yield put(saveJournalOnTop([journal]))
  } catch (err) {
    yield put({ type: 'JOURNAL.SAVE', message: err.message })
  }
}

function* watchJournal() {
  yield takeLatest(JOURNAL.FETCH._, HandleFetchJournal)
  yield takeLatest(JOURNAL.FETCH.MORE, HandleFetchJournalMore)
  yield takeLatest(JOURNAL.SEND, HandleSendJournal)
}

export default watchJournal
