import { JOURNAL } from '..'

const initialState = []

const journals = (state = initialState, action) => {
	switch (action.type) {
		case JOURNAL.LOAD:
			return [ action.data, ...state ]
		default:
			return state
	}
}

export default journals
