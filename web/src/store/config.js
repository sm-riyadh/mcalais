import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'
import rootReducer from './reducers'

const monitor = window['__SAGA_MONITOR_EXTENSION__']

const configureStore = () => {
	const sagaMiddleware = createSagaMiddleware({ sagaMonitor: monitor })
	const store = createStore(
		rootReducer,

			window.__REDUX_DEVTOOLS_EXTENSION__ ? compose(
				applyMiddleware(sagaMiddleware),
				window.__REDUX_DEVTOOLS_EXTENSION__()
			) :
			applyMiddleware(sagaMiddleware)
	)
	sagaMiddleware.run(rootSaga)
	return store
}

export default configureStore
