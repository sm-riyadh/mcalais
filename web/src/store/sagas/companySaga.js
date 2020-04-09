import { call, put, takeLatest } from 'redux-saga/effects'
import Api from './api/api'

import { COMPANY } from '../index'
import { accountAction } from '../actions'

const { replace, addTop, addBottom, modify, remove } = accountAction.save
const { request, success, failed } = accountAction.status

const url = 'company'

/* --------------------------------- SAGA middleware --------------------------------- */

// CODE: FETCH

function* handleFetch({ payload = {} }) {
  try {
    const { id } = payload

    const params = [ id ]

    yield put(request())
    const { data, error } = yield call(Api.fetch, [ url, { params } ])

    if (!error) {
      // yield put(replace(data))
      console.log('function*handleFetch -> data', data)
      yield put(success())
    } else throw error
  } catch (error) {
    console.log('function*handleFetch -> error', error)
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
      // yield put(addTop(data))
      // yield put(addBottom(data))
      console.log('function*handleCreate -> data', data)
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
      console.log('function*handleModify -> data', data)
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
      console.log('function*handleActivate -> data', data)
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
      console.log('function*handleDeactivate -> data', data)
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
      console.log('function*handleRemove -> data', data)
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
