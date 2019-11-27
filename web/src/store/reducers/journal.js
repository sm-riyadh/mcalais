import { JOURNAL } from '..'

const initialState = []

const journal = (state = initialState, action) => {
	switch (action.type) {
		case JOURNAL.SAVE:
			return action.data
		case JOURNAL.NEW_SAVE:
			return [
				{
					date: new Date().getTime(),
					destination: action.data.destination,
					source: action.data.source,
					amount: +action.data.amount,
				},
				...state,
			]
		default:
			return state
	}
}

export default journal
