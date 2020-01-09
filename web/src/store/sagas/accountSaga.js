import { put, call, takeLatest } from 'redux-saga/effects'

import { ACCOUNT } from '../index'
import { saveAccount, fetchAccount } from '../actions'
import Api from './api/account'

function* handleAccountFetch() {
  try {
    const journalData = yield call(Api.fetchAccount)
    yield put(saveAccount(journalData))
  } catch (e) {
    yield put({ type: 'ACCOUNT.SAVE', message: e.message })
  }
}

function* handleAddAccount(payload) {
  try {
    yield call(Api.addAccount, [payload.data])
    yield put(fetchAccount())
  } catch (e) {
    yield put({ type: 'ACCOUNT.NEW_SAVE', message: e.message })
  }
}
function* handleChangeAccount(payload) {
  try {
    yield call(Api.changeAccount, [payload.data])
    yield put(fetchAccount())
  } catch (e) {
    yield put({ type: 'ACCOUNT.NEW_SAVE', message: e.message })
  }
}

function* watchAccount() {
  yield takeLatest(ACCOUNT.FETCH, handleAccountFetch)
  yield takeLatest(ACCOUNT.CHANGE, handleChangeAccount)
  yield takeLatest(ACCOUNT.ADD, handleAddAccount)
}

export default watchAccount
