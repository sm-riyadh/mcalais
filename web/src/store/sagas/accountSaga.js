import { call, put, takeLatest } from 'redux-saga/effects'
import Api from './api/api'

import { ACCOUNT } from '../index'
import { accountAction } from '../actions'

const { replace, addTop, addBottom, modify, remove } = accountAction.save
const { request, success, failed } = accountAction.status

const url = 'account'

/* --------------------------------- SAGA middleware --------------------------------- */

// CODE: FETCH

function* handleFetch({ payload = {} }) {
  try {
    const { id, company, nonempty } = payload

    const query = { company, nonempty }
    const params = [ id ]

    yield put(request())
    const { data, error } = yield call(Api.fetch, [ url, { params, query } ])

    if (!error) {
      // yield put(replace(data))
      console.log('function*handleFetch -> data', data)
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

// CODE: Create

function* handleCreate({ payload = {} }) {
  try {
    const { company, name, path, type } = payload

    const body = { company, name, path, type }

    yield put(request())
    const { data, error } = yield call(Api.create, [ url, { body } ])

    if (!error) {
      // yield put(addTop(data))
      // yield put(addBottom(data))
      console.log('function*handleFetch -> data', data)
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
      // yield put(modify(data))
      console.log('function*handleFetch -> data', data)
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
      // yield put(modify(data))
      console.log('function*handleFetch -> data', data)
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
      // yield put(modify(data))
      console.log('function*handleFetch -> data', data)
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
      // yield put(remove(data))
      console.log('function*handleFetch -> data', data)
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

/* --------------------------------- WATCHERS --------------------------------- */

function* watch() {
  yield takeLatest(ACCOUNT.SEND.FETCH, handleFetch)
  yield takeLatest(ACCOUNT.SEND.CREATE, handleCreate)
  yield takeLatest(ACCOUNT.SEND.MODIFY, handleModify)
  yield takeLatest(ACCOUNT.SEND.ACTIVATE, handleActivate)
  yield takeLatest(ACCOUNT.SEND.DEACTIVATE, handleDeactivate)
  yield takeLatest(ACCOUNT.SEND.REMOVE, handleRemove)
}

export default watch
