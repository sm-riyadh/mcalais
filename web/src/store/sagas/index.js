import { all } from 'redux-saga/effects'

import accountSaga from './accountSaga'
import journalSaga from './journalSaga'
import ledgerSaga from './ledgerSaga'

export default function* rootSaga() {
  yield all([accountSaga(), journalSaga(), ledgerSaga()])
}
