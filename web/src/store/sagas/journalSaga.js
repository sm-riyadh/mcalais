import { call, put, takeLatest } from 'redux-saga/effects'
import { API } from './api/api'

import { JOURNAL } from '../index'
import { account } from '../actions'

const { replace, addTop, addBottom, modify, remove } = account.save
const { request, success, failed } = account.status

const url = 'company'

// CODE: FETCH

function* handleFetch({ payload }) {
  try {
    const { id, filters } = payload

    const query = { id }
    const params = { filters }

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
    const { date, company, credit, credit_note, debit, debit_note, description, amount, comment } = payload

    const body = { date, company, credit, credit_note, debit, debit_note, description, amount, comment }

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
    const { id, date, credit_note, debit_note, description, comment } = payload

    const params = { id }
    const body = { date, credit_note, debit_note, description, comment }

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

function* watch() {
  yield takeLatest(JOURNAL.SEND.FETCH._, handleFetch)
  yield takeLatest(JOURNAL.SEND.CREATE._, handleCreate)
  yield takeLatest(JOURNAL.SEND.MODIFY._, handleModify)
  yield takeLatest(JOURNAL.SEND.ACTIVATE._, handleActivate)
  yield takeLatest(JOURNAL.SEND.DEACTIVATE._, handleDeactivate)
  yield takeLatest(JOURNAL.SEND.REMOVE, handleRemove)
}

export default watch
