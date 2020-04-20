import { call, put, takeLatest } from 'redux-saga/effects'
import Api from './api/api'

import { ACCOUNT } from '../index'
import { accountAction } from '../actions'

const { replace, addTop, addBottom, modify, activate, deactivate, remove } = accountAction.save
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
      if (nonempty) {
        yield put(replace({ key: 'account_nonempty', data }))
      } else {
        yield put(replace({ key: 'account', data }))
      }
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
      yield put(addTop({ key: 'account', data }))
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
      yield put(modify({ key: 'account', data: { id, name } }))
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
      yield put(activate({ key: 'account', data: { id } }))
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
      yield put(deactivate({ key: 'account', data: { id } }))
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
      yield put(remove({ key: 'account', data: { id } }))
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
