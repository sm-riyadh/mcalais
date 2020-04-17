import { all } from 'redux-saga/effects'

import journalSaga from './journalSaga'
import accountSaga from './accountSaga'
import companySaga from './companySaga'
import settingsSaga from './settingsSaga'

export default function* rootSaga() {
  yield all([ journalSaga(), accountSaga(), companySaga(), settingsSaga() ])
}
