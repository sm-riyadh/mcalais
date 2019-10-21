import { LEDGERS } from '..'

const initialState = [
	{
		name: 'Cost',
		code: '100001',
		isCheckable: true,
		debit: 400,
		credit: 400,

		transactions: [
			{
				journalEntry: 1,
				date: 1571654111675,
				particular: '100002',
				debit: 200,
				credit: null,
			},
			{
				journalEntry: 2,
				date: 1571654111675,
				particular: '100003',
				debit: null,
				credit: 400,
			},
			{
				journalEntry: 3,
				date: 1571654111675,
				particular: '100003',
				debit: 200,
				credit: null,
			},
		],
	},
	{
		name: 'Bank',
		code: '100002',
		isCheckable: true,
		debit: 600,
		credit: 600,

		transactions: [
			{
				journalEntry: 1,
				date: 1571654111675,
				particular: '100003',
				debit: 500,
				credit: null,
			},
			{
				journalEntry: 2,
				date: 1571654111675,
				particular: '100003',
				debit: null,
				credit: 600,
			},
			{
				journalEntry: 3,
				date: 1571654111675,
				particular: '100003',
				debit: 100,
				credit: null,
			},
		],
	},
]

const ledgers = (state = initialState, action) => {
	switch (action.type) {
		case LEDGERS.LOAD:
			return [ action.data, ...state ]
		default:
			return state
	}
}

export default ledgers
