import { call, put, takeLatest } from 'redux-saga/effects'
import { API } from './api/api'

import { COMPANY } from '../index'
import { account } from '../actions'

const { replace, addTop, addBottom, modify, remove } = account.save
const { request, success, failed } = account.status

const url = 'company'

/* --------------------------------- SAGA middleware --------------------------------- */

// CODE: FETCH

function* handleFetch({ payload }) {
  try {
    const { id } = payload

    const query = { id }

    yield put(request())
    const { data, error } = yield call(API.fetch, [ url, { query } ])

    if (!error) {
      yield put(replace(data))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

// CODE: Create

function* handleCreate({ payload }) {
  try {
    const { name } = payload

    const body = { name }

    yield put(request())
    const { data, error } = yield call(API.create, [ url, { body } ])

    if (!error) {
      // yield put(addTop(data))
      yield put(addBottom(data))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

// CODE: Modify

function* handleModify({ payload }) {
  try {
    const { id, name } = payload

    const params = { id }
    const body = { name }

    yield put(request())
    const { data, error } = yield call(API.remove, [ url, { params, body } ])

    if (!error) {
      yield put(modify(data))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

// CODE: Activate

function* handleActivate({ payload }) {
  try {
    const { id } = payload

    const params = { id }

    yield put(request())
    const { data, error } = yield call(API.activate, [ url, { params } ])

    if (!error) {
      yield put(modify(data))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

// CODE: Deactivate

function* handleDeactivate({ payload }) {
  try {
    const { id } = payload

    const params = { id }

    yield put(request())
    const { data, error } = yield call(API.deactivate, [ url, { params } ])

    if (!error) {
      yield put(modify(data))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

// CODE: Remove

function* handleRemove({ payload }) {
  try {
    const { id } = payload

    const params = { id }

    yield put(request())
    const { data, error } = yield call(API.remove, [ url, { params } ])

    if (!error) {
      yield put(remove(data))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

/* --------------------------------- WATCHERS --------------------------------- */

function* watch() {
  yield takeLatest(COMPANY.SEND.FETCH._, handleFetch)
  yield takeLatest(COMPANY.SEND.CREATE._, handleCreate)
  yield takeLatest(COMPANY.SEND.MODIFY._, handleModify)
  yield takeLatest(COMPANY.SEND.ACTIVATE._, handleActivate)
  yield takeLatest(COMPANY.SEND.DEACTIVATE._, handleDeactivate)
  yield takeLatest(COMPANY.SEND.REMOVE, handleRemove)
}

export default watch
