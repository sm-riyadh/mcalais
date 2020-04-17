import { call, put, takeLatest } from 'redux-saga/effects'
import Api from './api/api'

import { SETTINGS } from '../index'
import { settingsAction } from '../actions'

const { replace, change } = settingsAction.save
const { request, success, failed } = settingsAction.status

const url = 'settings'

// CODE: FETCH

function* handleFetch({ payload = {} }) {
  try {
    const { id } = payload

    const params = [ id ]

    yield put(request())
    // const { data, error } = yield call(Api.fetch, [ url, { params } ])
    const error = false
    const data = {
      isCollapsed     : false,
      selectedCompany : '5e8f203e1a53001dec074c9a',
    }

    if (!error) {
      yield put(replace({ key: '', data }))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

// CODE: Modify

function* handleModify({ payload = {} }) {
  try {
    const { id, key, value } = payload

    const params = [ id ]
    const body = { key, value }

    yield put(request())
    // const { data, error } = yield call(Api.modify, [ url, { body } ])
    const error = false

    if (!error) {
      yield put(change({ key, data: { value } }))
      yield put(success())
    } else throw error
  } catch (error) {
    yield put(failed(error.toString()))
  }
}

function* watch() {
  yield takeLatest(SETTINGS.SEND.FETCH, handleFetch)
  yield takeLatest(SETTINGS.SEND.MODIFY, handleModify)
}

export default watch
