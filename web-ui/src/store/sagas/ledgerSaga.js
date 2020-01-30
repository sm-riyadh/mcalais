import { call, put, takeLatest } from 'redux-saga/effects'
import API from './api/ledger'

import { LEDGER } from '../index'
import { saveLedgerList } from '../actions'

function* handleLedgerListFetch() {
  try {
    const ledger = yield call(API.fetchLedgerList)
    yield put(saveLedgerList(ledger))
  } catch (err) {
    yield put({ type: 'LEDGER.SAVE', message: err.message })
  }
}

function* watchLedger() {
  yield takeLatest(LEDGER.FETCH.LIST, handleLedgerListFetch)
}

export default watchLedger
