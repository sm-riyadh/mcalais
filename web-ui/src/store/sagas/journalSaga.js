import { call, put, takeLatest } from 'redux-saga/effects'

import { JOURNAL } from '../index'
import Api from './api/journal'
import {
  saveJournalInit,
  saveJournalMore,
  saveJournalOfAccount,
} from '../actions'

function* HandleFetchJournalInit({ payload }) {
  try {
    const journal = yield call(Api.fetchJournalInit, [payload])
    yield put(saveJournalInit(journal))
  } catch (err) {
    yield put({ type: 'JOURNAL.SAVE', message: err.message })
  }
}
function* HandleFetchJournalMore(payload) {
  try {
    const journal = yield call(Api.fetchJournalMore, [payload])
    yield put(saveJournalMore(journal))
  } catch (err) {
    yield put({ type: 'JOURNAL.SAVE', message: err.message })
  }
}
function* HandleFetchJournalOfAccount(payload) {
  try {
    const journal = yield call(Api.fetchJournalOfAccount, [payload])
    yield put(saveJournalOfAccount(journal))
  } catch (err) {
    yield put({ type: 'JOURNAL.SAVE', message: err.message })
  }
}

function* watchJournal() {
  yield takeLatest(JOURNAL.FETCH.INIT, HandleFetchJournalInit)
  yield takeLatest(JOURNAL.FETCH.ACCOUNT, HandleFetchJournalOfAccount)
  yield takeLatest(JOURNAL.FETCH.MORE, HandleFetchJournalMore)
}

export default watchJournal
