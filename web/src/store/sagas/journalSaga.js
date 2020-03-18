import { call, put, putResolve, takeLatest } from 'redux-saga/effects'
import API from './api/journal'

import { JOURNAL } from '../index'
import { saveJournal, saveJournalOnBottom, saveJournalOnTop } from '../actions'

function* HandleFetchJournal({ payload }) {
  try {
    yield put({ type: JOURNAL.STATUS.REQUEST })
    const { data, error } = yield call(API.fetchJournal, [ payload ])

    if (!error) {
      yield put(saveJournal(data))
      yield put({ type: JOURNAL.STATUS.SUCCESS })
    } else throw error
  } catch (err) {
    yield put({ type: JOURNAL.STATUS.FAILED, payload: err.toString() })
  }
}
function* HandleFetchJournalMore({ payload }) {
  try {
    yield put({ type: JOURNAL.STATUS.REQUEST })
    const { data, error } = yield call(API.fetchJournal, [ payload ])

    if (!error) {
      yield put(saveJournalOnBottom(data))
      yield put({ type: JOURNAL.STATUS.SUCCESS })
    } else throw error
  } catch (err) {
    yield put({ type: JOURNAL.STATUS.FAILED, payload: err.toString() })
  }
}
function* HandleSendJournal({ payload }) {
  try {
    yield put({ type: JOURNAL.STATUS.REQUEST })
    const { data, error } = yield call(API.sendJournal, [ payload ])

    if (!error) {
      yield put(saveJournalOnTop(data))
      yield put({ type: JOURNAL.STATUS.SUCCESS })
    } else throw error
  } catch (err) {
    console.log(err)
    yield put({ type: JOURNAL.STATUS.FAILED, payload: err.toString() })
  }
}

function* watchJournal() {
  yield takeLatest(JOURNAL.FETCH._, HandleFetchJournal)
  yield takeLatest(JOURNAL.FETCH.MORE, HandleFetchJournalMore)
  yield takeLatest(JOURNAL.SEND, HandleSendJournal)
}

export default watchJournal
