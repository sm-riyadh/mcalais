import { call, put, takeLatest } from 'redux-saga/effects'
import API from './api/company'

import { COMPANY } from '../index'
import { saveCompany } from '../actions'

function* HandleFetchCompany() {
  try {
    yield put({ type: COMPANY.STATUS.REQUEST })
    const { data, error } = yield call(API.fetchCompany)

    if (!error) {
      yield put(saveCompany(data))
      yield put({ type: COMPANY.STATUS.SUCCESS })
    } else throw error
  } catch (err) {
    yield put({ type: COMPANY.STATUS.FAILED, payload: err.toString() })
  }
}
function* HandleSendCompany({ payload }) {
  try {
    yield put({ type: COMPANY.STATUS.REQUEST })
    const { data, error } = yield call(API.sendCompany, [ payload ])

    if (!error) {
      yield put(saveCompany(data))
      yield put({ type: COMPANY.STATUS.SUCCESS })
    } else throw error
  } catch (err) {
    yield put({ type: COMPANY.STATUS.FAILED, payload: err.toString() })
  }
}

function* watchCompany() {
  yield takeLatest(COMPANY.FETCH, HandleFetchCompany)
  yield takeLatest(COMPANY.SEND, HandleSendCompany)
}

export default watchCompany
