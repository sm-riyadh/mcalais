import { call, put, takeLatest } from 'redux-saga/effects'

import { LEDGER } from '../index'
import Api from './api/ledger'
import { saveLedger, saveNewLedger } from '../actions'

function* handleLedgerFetch() {
  try {
    const ledgerlData = yield call(Api.fetchLedger)
    yield put(saveLedger(ledgerlData))
  } catch (e) {
    yield put({ type: 'LEDGER.SAVE', message: e.message })
  }
}

function* handleLedgerNew(payload) {
  console.log('object')
  try {
    yield put(saveNewLedger(payload))
  } catch (e) {
    yield put({ type: 'LEDGER.SAVE', message: e.message })
  }
}

function* watchLedger() {
  yield takeLatest(LEDGER.FETCH, handleLedgerFetch)
  yield takeLatest(LEDGER.NEW_SAVE, handleLedgerNew)
}

export default watchLedger
