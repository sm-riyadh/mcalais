import { call, put, takeLatest } from 'redux-saga/effects'

import { LEDGER } from '../index'
import Api from './api/ledger'
import { saveLedger } from '../actions'

function* handleLedgerFetch(payload) {
  try {
    const ledger = yield call(Api.fetchLedger, [payload.data])
    yield put(saveLedger(ledger))
  } catch (err) {
    yield put({ type: 'LEDGER.SAVE', message: err.message })
  }
}

function* watchLedger() {
  yield takeLatest(LEDGER.FETCH, handleLedgerFetch)
}

export default watchLedger
