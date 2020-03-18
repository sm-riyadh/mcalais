import { call, put, takeLatest } from 'redux-saga/effects'
import API from './api/coa'

import { COA } from '../index'
import { saveCoa, saveCoaList } from '../actions'

function* handleCoaFetch({ payload }) {
  try {
    yield put({ type: COA.STATUS.REQUEST })
    const { data, error } = yield call(API.fetchCoa, [ payload ])

    if (!error) {
      yield put(saveCoa(data))
      yield put({ type: COA.STATUS.SUCCESS })
    } else throw error
  } catch (err) {
    yield put({ type: COA.STATUS.FAILED, payload: err.toString() })
  }
}
function* handleCoaListFetch({ payload }) {
  try {
    yield put({ type: COA.STATUS.REQUEST })
    const { data, error } = yield call(API.fetchCoaList, [ payload ])

    if (!error) {
      yield put(saveCoaList(data))
      yield put({ type: COA.STATUS.SUCCESS })
    } else throw error
  } catch (err) {
    yield put({ type: COA.STATUS.FAILED, payload: err.toString() })
  }
}
function* handleCoaSend({ payload }) {
  try {
    yield put({ type: COA.STATUS.REQUEST })
    const { data, error } = yield call(API.sendCoa, [ payload ])

    if (!error) {
      yield put(saveCoa(data))
      yield put({ type: COA.STATUS.SUCCESS })
    } else throw error
  } catch (err) {
    yield put({ type: COA.STATUS.FAILED, payload: err.toString() })
  }
}
function* watchCoa() {
  yield takeLatest(COA.FETCH._, handleCoaFetch)
  yield takeLatest(COA.FETCH.LIST, handleCoaListFetch)
  yield takeLatest(COA.SEND, handleCoaSend)
}

export default watchCoa
