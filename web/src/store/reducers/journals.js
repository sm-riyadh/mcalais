import { JOURNALS } from '..'

const initialState = []

const journals = (state = initialState, action) => {
	switch (action.type) {
		case JOURNALS.LOAD:
			return [ action.data, ...state ]
		default:
			return state
	}
}

export default journals
