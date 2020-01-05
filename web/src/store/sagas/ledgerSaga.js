import { call, put, takeLatest } from 'redux-saga/effects'

import { LEDGER } from '../index'
import Api from './api/ledger'
import { saveLedger } from '../actions'

function* handleLedgerFetch(payload) {
  try {
    const ledger = yield call(Api.fetchLedger, [payload.data])
    yield put(saveLedger(ledger))
  } catch (e) {
    yield put({ type: 'LEDGER.SAVE', message: e.message })
  }
}

function* watchLedger() {
  yield takeLatest(LEDGER.FETCH, handleLedgerFetch)
}

export default watchLedger
