import { call, put, takeLatest } from 'redux-saga/effects'
import API from './api/company'

import { COMPANY } from '../index'
import { saveCompany } from '../actions'

function* HandleFetchCompany() {
  try {
    const company = yield call(API.fetchCompany)
    yield put(saveCompany(company))
  } catch (err) {
    yield put({ type: 'COMPANY.SAVE', message: err.message })
  }
}
function* HandleSendCompany({ payload }) {
  try {
    const company = yield call(API.sendCompany, [payload])
    yield put(saveCompany(company))
  } catch (err) {
    yield put({ type: 'COMPANY.SAVE', message: err.message })
  }
}

function* watchCompany() {
  yield takeLatest(COMPANY.FETCH, HandleFetchCompany)
  yield takeLatest(COMPANY.SEND, HandleSendCompany)
}

export default watchCompany
