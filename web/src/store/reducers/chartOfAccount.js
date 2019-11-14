import { COA } from '..'

const initialState = []

const chartOfAccount = (state = initialState, action) => {
	switch (action.type) {
		case COA.SAVE:
			return action.data
		case COA.NEW_SAVE:
			console.log(action.data)
			const newState = [ ...state ]
			newState.filter(e => e.code === action.data.destination)[0].debit += +action.data.amount
			newState.filter(e => e.code === action.data.destination)[0].balance -= +action.data.amount
			newState.filter(e => e.code === action.data.source)[0].credit += +action.data.amount
			newState.filter(e => e.code === action.data.source)[0].balance -= +action.data.amount

			return newState
		default:
			return state
	}
}

export default chartOfAccount
