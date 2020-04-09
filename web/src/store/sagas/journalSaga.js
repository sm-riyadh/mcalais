import { call, put, takeLatest } from 'redux-saga/effects'
import Api from './api/api'

import { JOURNAL } from '../index'
import { journalAction } from '../actions'

const { replace, addTop, addBottom, modify, remove } = journalAction.save
const { request, success, failed } = journalAction.status

const url = 'journal'

// CODE: FETCH

function* handleFetch({ payload = {} }) {
  try {
    const { id, company, type, size, page, start_date, end_date } = payload

    const params = [ id ]
    const query = { company, type, size, page, start_date, end_date }

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

function* handleCreate({ payload }) {
  try {
    const { date, company, credit, credit_note, debit, debit_note, description, amount, comment } = payload

    const body = { date, company, credit, credit_note, debit, debit_note, description, amount, comment }

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

function* handleModify({ payload }) {
  try {
    const { id, date, credit_note, debit_note, description, comment } = payload

    const params = [ id ]
    const body = { date, credit_note, debit_note, description, comment }

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

function* handleActivate({ payload }) {
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

function* handleDeactivate({ payload }) {
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

function* watch() {
  yield takeLatest(JOURNAL.SEND.FETCH, handleFetch)
  yield takeLatest(JOURNAL.SEND.CREATE, handleCreate)
  yield takeLatest(JOURNAL.SEND.MODIFY, handleModify)
  yield takeLatest(JOURNAL.SEND.ACTIVATE, handleActivate)
  yield takeLatest(JOURNAL.SEND.DEACTIVATE, handleDeactivate)
}

export default watch
