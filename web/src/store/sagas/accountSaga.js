import { put, call, takeLatest } from 'redux-saga/effects'

import { ACCOUNT } from '../index'
import { saveAccount, fetchAccount, saveCatagory } from '../actions'
import Api from './api/account'

function* handleAccountFetch() {
  try {
    const accountData = yield call(Api.fetchAccount)
    const catagoryData = yield call(Api.fetchCatagory)

    yield put(saveAccount(accountData))
    yield put(saveCatagory(catagoryData[0].catagory))
  } catch (err) {
    yield put({ type: 'ACCOUNT.SAVE', message: err.message })
  }
}

function* handleAddAccount(payload) {
  try {
    yield call(Api.addAccount, [payload.data])
    yield put(fetchAccount())
  } catch (err) {
    yield put({ type: 'ACCOUNT.NEW_SAVE', message: err.message })
  }
}
function* handleChangeAccount(payload) {
  try {
    yield call(Api.changeAccount, [payload.data])
    yield put(fetchAccount())
  } catch (err) {
    yield put({ type: 'ACCOUNT.NEW_SAVE', message: err.message })
  }
}

function* watchAccount() {
  yield takeLatest(ACCOUNT.FETCH, handleAccountFetch)
  yield takeLatest(ACCOUNT.CHANGE, handleChangeAccount)
  yield takeLatest(ACCOUNT.ADD, handleAddAccount)
}

export default watchAccount
