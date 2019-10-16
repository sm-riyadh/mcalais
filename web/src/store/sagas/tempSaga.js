// import { take, call, fork, put } from 'redux-saga/effects'

// // import { fetchImageStats } from '../api'
// import { TEMP } from '../actions'

// export function* handleTempRequest(id) {
// 	for (let i = 0; i < 3; i++) {
// 		try {
// 			// yield put(loadImageStats(id))
// 			// const res = yield call(fetchImageStats, id)
// 			// yield put(TEMP(id, res.downloads.total))
// 			return true
// 		} catch (e) {
// 			// we just need to retry and dispactch an error
// 			// if we tried more than 3 times
// 		}
// 	}
// 	// yield put(setImageStatsError(id))
// }

// export default function* watchTempRequest() {
// 	while (true) {
// 		// const { images } = yield take(TEMP.LOAD_SUCCESS)

// 		for (let i = 0; i < images.length; i++) {
// 			// yield fork(handleStatsRequest, images[i].id)
// 		}
// 	}
// }
