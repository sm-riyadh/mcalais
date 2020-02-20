import { all } from 'redux-saga/effects'

// import coaSaga from './coaSaga'
import journalSaga from './journalSaga'
import coaSaga from './coaSaga'

export default function* rootSaga() {
  yield all([journalSaga(), coaSaga()])
}
