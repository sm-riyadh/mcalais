import { call, put, takeLatest } from 'redux-saga/effects'
import API from './api/account'

import { ACCOUNT } from '../index'
import { saveAccount, saveAccountList } from '../actions'

function* handleAccountFetch({ payload }) {
  try {
    yield put({ type: ACCOUNT.STATUS.REQUEST })
    const { data, error } = yield call(API.fetchAccount, [ payload ])

    if (!error) {
      yield put(saveAccount(data))
      yield put({ type: ACCOUNT.STATUS.SUCCESS })
    } else throw error
  } catch (err) {
    yield put({ type: ACCOUNT.STATUS.FAILED, payload: err.toString() })
  }
}
function* handleAccountListFetch({ payload }) {
  try {
    yield put({ type: ACCOUNT.STATUS.REQUEST })
    const { data, error } = yield call(API.fetchAccountList, [ payload ])

    if (!error) {
      yield put(saveAccountList(data))
      yield put({ type: ACCOUNT.STATUS.SUCCESS })
    } else throw error
  } catch (err) {
    yield put({ type: ACCOUNT.STATUS.FAILED, payload: err.toString() })
  }
}
function* handleAccountSend({ payload }) {
  try {
    yield put({ type: ACCOUNT.STATUS.REQUEST })
    const { data, error } = yield call(API.sendAccount, [ payload ])

    if (!error) {
      yield put(saveAccount(data))
      yield put({ type: ACCOUNT.STATUS.SUCCESS })
    } else throw error
  } catch (err) {
    yield put({ type: ACCOUNT.STATUS.FAILED, payload: err.toString() })
  }
}
function* handleAccountRemove({ payload }) {
  try {
    yield put({ type: ACCOUNT.STATUS.REQUEST })
    const { data, error } = yield call(API.removeAccount, [ payload ])

    if (!error) {
      yield put(saveAccount(data))
      yield put({ type: ACCOUNT.STATUS.SUCCESS })
    } else throw error
  } catch (err) {
    yield put({ type: ACCOUNT.STATUS.FAILED, payload: err.toString() })
  }
}
function* watchAccount() {
  yield takeLatest(ACCOUNT.FETCH._, handleAccountFetch)
  yield takeLatest(ACCOUNT.FETCH.LIST, handleAccountListFetch)
  yield takeLatest(ACCOUNT.REMOVE, handleAccountRemove)
  yield takeLatest(ACCOUNT.SEND, handleAccountSend)
}

export default watchAccount
