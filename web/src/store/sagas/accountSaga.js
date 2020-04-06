import { call, put, takeLatest } from 'redux-saga/effects'
import { API } from './api/api'

import { ACCOUNT } from '../index'
import { account } from '../actions'

const { replace, addTop, addBottom, modify, remove } = account.save
const { request, success, failed } = account.status

const url = 'account'

/* --------------------------------- SAGA middleware --------------------------------- */

// CODE: FETCH

function* handleFetch({ payload }) {
  try {
    const { id, company, nonempty } = payload

    const params = { company, nonempty }
    const query = { id }

    yield put(request())
    const { data, error } = yield call(API.fetch, [ url, { params, query } ])

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
    const { company, name, path, type } = payload

    const body = { company, name, path, type }

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
  yield takeLatest(ACCOUNT.SEND.FETCH._, handleFetch)
  yield takeLatest(ACCOUNT.SEND.CREATE._, handleCreate)
  yield takeLatest(ACCOUNT.SEND.MODIFY._, handleModify)
  yield takeLatest(ACCOUNT.SEND.ACTIVATE._, handleActivate)
  yield takeLatest(ACCOUNT.SEND.DEACTIVATE._, handleDeactivate)
  yield takeLatest(ACCOUNT.SEND.REMOVE, handleRemove)
}

export default watch
