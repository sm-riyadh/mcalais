import { call, put, takeLatest } from 'redux-saga/effects'
import Api from './api/api'

import { COMPANY } from '../index'
import { companyAction } from '../actions'

const { replace, addTop, modify, activate, deactivate, remove } = companyAction.save
const { request, success, failed } = companyAction.status

const url = 'company'

/* --------------------------------- SAGA middleware --------------------------------- */

// CODE: FETCH

function* handleFetch({ payload = {} }) {
  try {
    const { id } = payload

    const params = [ id ]

    // yield put(request())
    const { data, error } = yield call(Api.fetch, [ url, { params } ])

    if (!error) {
      yield put(replace({ key: 'company', data }))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

// CODE: Create

function* handleCreate({ payload = {} }) {
  try {
    const { name } = payload

    const body = { name }

    yield put(request())
    const { data, error } = yield call(Api.create, [ url, { body } ])

    if (!error) {
      yield put(addTop({ key: 'company', data }))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

// CODE: Modify

function* handleModify({ payload = {} }) {
  try {
    const { id, name } = payload

    const params = [ id ]
    const body = { name }

    yield put(request())
    const { data, error } = yield call(Api.modify, [ url, { params, body } ])

    if (!error) {
      yield put(modify({ key: 'company', data: { id, name } }))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

// CODE: Activate

function* handleActivate({ payload = {} }) {
  try {
    const { id } = payload

    const params = [ id ]

    yield put(request())
    const { data, error } = yield call(Api.activate, [ url, { params } ])

    if (!error) {
      yield put(activate({ key: 'company', data: { id } }))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

// CODE: Deactivate

function* handleDeactivate({ payload = {} }) {
  try {
    const { id } = payload

    const params = [ id ]

    yield put(request())
    const { data, error } = yield call(Api.deactivate, [ url, { params } ])

    if (!error) {
      yield put(deactivate({ key: 'company', data: { id } }))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

// CODE: Remove

function* handleRemove({ payload = {} }) {
  try {
    const { id } = payload

    const params = [ id ]

    yield put(request())
    const { data, error } = yield call(Api.remove, [ url, { params } ])

    if (!error) {
      yield put(remove({ key: 'company', data: { id } }))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

/* --------------------------------- WATCHERS --------------------------------- */

function* watch() {
  yield takeLatest(COMPANY.SEND.FETCH, handleFetch)
  yield takeLatest(COMPANY.SEND.CREATE, handleCreate)
  yield takeLatest(COMPANY.SEND.MODIFY, handleModify)
  yield takeLatest(COMPANY.SEND.ACTIVATE, handleActivate)
  yield takeLatest(COMPANY.SEND.DEACTIVATE, handleDeactivate)
  yield takeLatest(COMPANY.SEND.REMOVE, handleRemove)
}

export default watch
