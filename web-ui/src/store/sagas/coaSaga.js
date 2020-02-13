import { call, put, takeLatest } from 'redux-saga/effects'
import API from './api/coa'

import { COA } from '../index'
import { saveCoa, saveCoaList } from '../actions'

function* handleCoaFetch({ payload }) {
  try {
    const coa = yield call(API.fetchCoa, [payload])
    yield put(saveCoa(coa))
  } catch (err) {
    yield put({ type: 'COA.SAVE', message: err.message })
  }
}
function* handleCoaListFetch({ payload }) {
  try {
    const coa = yield call(API.fetchCoaList, [payload])
    yield put(saveCoaList(coa))
  } catch (err) {
    yield put({ type: 'COA.SAVE', message: err.message })
  }
}

function* watchCoa() {
  yield takeLatest(COA.FETCH._, handleCoaFetch)
  yield takeLatest(COA.FETCH.LIST, handleCoaListFetch)
}

export default watchCoa
